const app = require('./app');
require('./config/database'); // Inicializa la DB

const PORT = process.env.PORT || 8082;

app.listen(PORT, () => {
  console.log(`Servicio de Métricas (Node.js) corriendo en puerto ${PORT}`);
});