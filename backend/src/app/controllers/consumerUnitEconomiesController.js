const express = require('express');
const router = express.Router();
const { getConsumerUnitEconomies } = require('../models/baseTestModel');

router.get('/consumer-unit-economies', async (req, res) => {
  try {
    const results = await getConsumerUnitEconomies();
    return res.json(results);
  } catch (error) {
    console.error('Erro ao executar a consulta:', error);
    return res.status(500).json({ error: 'Erro ao consultar banco de dados' });
  }
});

module.exports = router;
