const express = require('express');
const MetricaController = require('../controllers/metrica.controller');

const router = express.Router();
const controller = new MetricaController();

router.get('/', controller.findAll);
router.get('/:id', controller.findById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;