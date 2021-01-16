const express = require('express');
const router = express.Router();
const pool = require('../../dbPPE');
const { verifyToken } = require('../../lib/helpers');

router.get('/anuncios', verifyToken,(req, res) => {
  res.send('hola mundo, en anuncios');
});

module.exports = router;
