const express = require('express');
const router = express.Router();
const pool = require('../../dbPPE');

router.get('/contacto', (req, res) => {
  res.send('hola mundo, en contactos');
});

module.exports = router;
