const express = require('express');
const dotenv = require('dotenv');
const authMiddleware = require('./middleware/auth');
const metricasRoutes = require('./routes/metricas');

dotenv.config();

const app = express();
app.use(express.json()); 

// 1. Endpoint de Salud (Health Check)
// Debe ir ANTES del middleware de seguridad para que el servicio en la nube (Render/Docker) 
// pueda verificar si el servidor está vivo sin necesidad de un Token de Firebase.
app.get('/api/v1/health', (req, res) => {
  res.status(200).send('OK - Servicio de Métricas Activo');
});

// 2. Aplicamos el Middleware del API Gateway
// Todas las rutas que estén debajo de esta línea requerirán el secreto del Gateway
app.use(authMiddleware);

// 3. Montamos las rutas del CRUD
app.use('/api/v1/metricas-historicas', metricasRoutes);

// Levantar el servidor
const PORT = process.env.PORT || 8082;
app.listen(PORT, () => {
  console.log(`🚀 Servicio de Métricas (Node.js) corriendo en puerto ${PORT}`);
});