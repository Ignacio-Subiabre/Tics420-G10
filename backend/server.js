import cors from 'cors';
app.use(cors({
  origin: 'https://orange-river-0cca73f0f.1.azurestaticapps.net'
}));
const express = require('express');
const app = express();
const db = require('./models/db'); // conecta a MongoDB
const companyRoutes = require('./routes/companies');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

app.use(cors());
app.use(express.json());

app.use('/api/companies', companyRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto: ${PORT}`);
});
