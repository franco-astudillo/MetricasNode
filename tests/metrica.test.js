// tests/metrica.test.js
const request = require("supertest");
const dotenv = require("dotenv");
const app = require("../src/app"); 
const pool = require("../src/config/database"); // Importamos la conexión a DB

dotenv.config();

const gatewaySecret = process.env.GATEWAY_SECRET || 'local_test_back';

beforeAll(async () => {
  // Aquí el Pool ya se inicializa automáticamente por el require
  await new Promise(resolve => setTimeout(resolve, 1000));
});

afterAll(async () => {
  // FUNDAMENTAL: Cerramos la conexión a Postgres para que Jest termine
  await pool.end();
});

// Prueba para el Health Check
describe("GET /api/v1/health", () => {
  test("debe devolver que el servicio está activo", async () => {
    const response = await request(app).get("/api/v1/health");
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('OK - Servicio de Métricas Activo');
  });
});

describe("POST /api/v1/metricas-historicas", () => {
  test("debe crear una métrica cuando pasa el Gateway", async () => {
    const response = await request(app)
      .post("/api/v1/metricas-historicas")
      .set("X-Gateway-Secret", gatewaySecret)
      .send({
        nombreKpi: "Uso de CPU",       // Nombres exactos que espera tu Repository
        valorCalculado: 85.5,          
        proyectoId: 1                  
      });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty("id"); 
  });

  test("debe bloquear la petición si no trae el secreto del Gateway", async () => {
    const response = await request(app)
      .post("/api/v1/metricas-historicas")
      .send({
        nombreKpi: "Uso de RAM",
        valorCalculado: 60.0
      });

    expect(response.statusCode).toBe(403);
    expect(response.body).toHaveProperty("error", "Acceso denegado. Petición no autorizada por el API Gateway.");
  });
});

describe("GET /api/v1/metricas-historicas", () => {
  test("debe obtener todas las métricas históricas", async () => {
    const response = await request(app)
      .get("/api/v1/metricas-historicas")
      .set("X-Gateway-Secret", gatewaySecret);

    expect([200, 204]).toContain(response.statusCode);
    
    if (response.statusCode === 200) {
      expect(Array.isArray(response.body)).toBe(true);
    }
  });
});