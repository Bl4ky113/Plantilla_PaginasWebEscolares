const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const pool = require('../dbUsuarios');

router.get('/home', (req, res)=>{
  //render(hbs, {style: true||false})
    res.render('home/home', {
        showStyleNav: true,
        showStyleFooter: true,
    });
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

router.get('/signup', (req, res)=>{
    res.render('home/signup');

});

module.exports = router;
