const express = require('express');
const cors = require('cors');
const db = require('./models/db'); // conecta a MongoDB
const companyRoutes = require('./routes/companies');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Configuración de CORS
app.use(cors({
  origin: '*', // Puedes restringir esto más adelante
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
