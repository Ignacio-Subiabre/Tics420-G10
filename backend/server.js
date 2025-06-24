const express = require('express');
const cors = require('cors');
const db = require('./models/db'); // conecta a MongoDB
const companyRoutes = require('./routes/companies');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Configuración de CORS

const allowedOrigins = ['https://orange-river-0cca73f0f.1.azurestaticapps.net'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS not allowed'));
    }
  },
  credentials: true
}));

app.use(express.json());

// Rutas
app.use('/api/companies', companyRoutes);
app.use('/api/auth', authRoutes);

// Puerto dinámico para funcionar en Azure
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto: ${PORT}`);
});