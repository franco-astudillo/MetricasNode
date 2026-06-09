class MetricaModel {
  constructor(row) {
    this.id = row.id;
    this.nombreKpi = row.nombre_kpi;
    this.valorCalculado = row.valor_calculado;
    this.fechaCalculo = row.fecha_calculo;
    this.proyectoId = row.proyecto_id;
  }

  static fromList(rows) {
    return rows.map(row => new MetricaModel(row));
  }
}

module.exports = MetricaModel;