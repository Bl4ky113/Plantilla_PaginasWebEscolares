const express = require('express');
const router = express.Router();
const pool = require('../../dbPPE');
const { verifyToken } = require('../../lib/helpers');

//Quitado  verifyToken para sencilles al momento de hacer el Dessign (18/01)
router.get('/home',(req, res) => {
  res.render('home/home', {
    title: 'home',
  });
});

// jsonwebtokens
// acabar el enrutado
// poner todo a async await
// poner testing -- e instalar modulos de testing
// pasar a sass
// pasar png a svg (logos)
// hacer una forma en que un usuario pueda subir y ver un aviso o post
// organizar esos avisos o post por diferentes datos

module.exports = router;
