const express = require('express');
const router = express.Router();
const { Parser } = require('json2csv');
const Empresa = require('../models/company'); // Modelo importado correctamente

// Obtener todas las empresas
router.get('/', async (req, res) => {
  try {
    const empresas = await Empresa.find();
    res.json(empresas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener empresas' });
  }
});

// Obtener una empresa por RUT
router.get('/:rut', async (req, res) => {
  try {
    const empresa = await Empresa.findOne({ rut: req.params.rut });
    if (!empresa) return res.status(404).json({ error: 'Empresa no encontrada' });
    res.json(empresa);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar empresa' });
  }
});

// Descargar JSON
router.get('/download/json', async (req, res) => {
  try {
    const companies = await Empresa.find({});
    res.setHeader('Content-Disposition', 'attachment; filename=companies.json');
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(companies, null, 2));
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener datos' });
  }
});

// Descargar CSV
router.get('/download/csv', async (req, res) => {
  try {
    console.log('📥 Buscando empresas...');
    const companies = await Empresa.find().lean();
    console.log(`✅ Empresas encontradas: ${companies.length}`);

    if (!companies || companies.length === 0) {
      return res.status(404).json({ error: 'No hay empresas en la base de datos' });
    }

    console.log('🧪 Primer documento:', companies[0]);

    const fields = ['rut', 'razon_social', 'tipo_evento', 'archivo', 'capital', 'objeto'];
    const opts = { fields, defaultValue: '' };

    const parser = new Parser(opts);
    const csv = parser.parse(companies);

    res.header('Content-Type', 'text/csv');
    res.attachment('empresas_chile.csv');
    return res.send(csv);
  } catch (err) {
    console.error('❌ CSV GENERATION ERROR:', err);
    res.status(500).json({ error: 'Error al generar CSV', detalle: err.message });
  }
});

module.exports = router;
