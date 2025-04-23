// extract_and_upload.js
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { DocumentProcessorServiceClient } = require('@google-cloud/documentai').v1;
const mongoose = require('mongoose');
const Company = require('./company'); // tu modelo de datos

// Configurar cliente de Google
const client = new DocumentProcessorServiceClient({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
});

const projectId = process.env.PROJECT_ID;
const location = process.env.LOCATION;
const processorId = process.env.PROCESSOR_ID;

const pdfDir = path.join(__dirname, 'pdfs');

// Función principal
async function processAndUpload() {
  const files = fs.readdirSync(pdfDir).filter(file => file.endsWith('.pdf'));

  for (const file of files) {
    const filePath = path.join(pdfDir, file);
    const document = {
      content: fs.readFileSync(filePath).toString('base64'),
      mimeType: 'application/pdf',
    };

    const name = `projects/${projectId}/locations/${location}/processors/${processorId}`;

    const request = {
      name,
      rawDocument: document,
    };

    try {
      const [result] = await client.processDocument(request);
      const { entities } = result.document;

      // Mapear entidades según los campos que definiste
      const data = {
        archivo: file,
        razon_social: getEntity(entities, 'razon_social'),
        nombre_fantasia: getEntity(entities, 'nombre_fantasia'),
        tipo_evento: getEntity(entities, 'tipo_evento'),
        capital: getEntity(entities, 'capital'),
        objeto: getEntity(entities, 'objeto'),
        socios: getEntityArray(entities, 'socio'),
        rut: getEntity(entities, 'rut')
      };

      // Validación: evitar documentos sin razón social
      if (!data.razon_social) {
        console.warn(`⚠️ Archivo ${file} omitido: no se encontró razón social.`);
        continue;
      }

      // Buscar por razon_social (único) y actualizar si existe
      await Company.findOneAndUpdate(
        { razon_social: data.razon_social },
        { $set: data },
        { upsert: true, new: true }
      );

      console.log(`✅ Procesado y guardado: ${file}`);
    } catch (error) {
      console.error(`❌ Error con archivo ${file}:`, error.message);
    }
  }

  mongoose.connection.close();
}

// Helpers
function getEntity(entities, type) {
  const entity = entities.find(e => e.type === type);
  return entity?.mentionText || null;
}

function getEntityArray(entities, type) {
  return entities.filter(e => e.type === type).map(e => e.mentionText);
}

// Iniciar
mongoose.connect('mongodb+srv://ignaciosubiabre10:iasc159753@cluster0.tw1gdvo.mongodb.net/empresas?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ Conectado a MongoDB');
  processAndUpload();
});
