const MetricaRepository = require('../repositories/metrica.repository');
const repository = new MetricaRepository();

class MetricaService {
  async findAll() {
    return await repository.findAll();
  }

  async findById(id) {
    return await repository.findById(id);
  }

  async create(data) {
    return await repository.create(data);
  }

  async update(id, data) {
    const existing = await repository.findById(id);
    if (!existing) return null;
    return await repository.update(id, data);
  }

  async delete(id) {
    const existing = await repository.findById(id);
    if (!existing) return null;
    return await repository.delete(id);
  }
}

module.exports = MetricaService;