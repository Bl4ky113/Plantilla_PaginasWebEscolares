const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const pool = require('../dbUsuarios');

router.get('/home', (req, res)=>{
    res.render('home/home.hbs', {showStyleNav: true});
});

router.get('/contactos', (req, res)=>{
    res.send('hola mundo, en contactos');
});

router.get('/anuncios', (req, res)=>{
    res.send('hola mundo, en anuncios');
});

router.get('/guias', (req, res)=>{
    res.send('hola mundo, en guias');
});

module.exports = router;
