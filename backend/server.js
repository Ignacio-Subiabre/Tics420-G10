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

// Middleware
app.use(express.json());

// Rutas
app.use('/api/companies', companyRoutes);
app.use('/api/auth', authRoutes);

// Puerto dinámico para funcionar en Azure
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(🚀 Servidor corriendo en el puerto: ${PORT});
});