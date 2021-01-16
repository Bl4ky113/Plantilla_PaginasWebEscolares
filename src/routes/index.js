const express = require('express');
const router = express.Router();
const pool = require('../dbPPE');

router.get('/PPE', (req, res)=> {
  res.send("Plantillas Gratuitas Para Instituciones Academicas");
});

router.get('/logout', (req, res)=>{
  localStorage.removeItem('token');
  res.send('token eliminado');
});

module.exports = router;
