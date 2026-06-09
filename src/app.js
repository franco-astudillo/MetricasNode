const express = require('express');
const dotenv = require('dotenv');
const authMiddleware = require('./middlewares/auth.middleware');
const metricaRoutes = require('./routes/metrica.routes');

dotenv.config();

const app = express();
app.use(express.json()); 

app.get('/api/v1/health', (req, res) => {
  res.status(200).send('OK - Servicio de Métricas Activo');
});

// Middleware de seguridad
app.use(authMiddleware);

// Rutas
app.use('/api/v1/metricas-historicas', metricaRoutes);

module.exports = app;