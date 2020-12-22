const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const pool = require('../dbUsuarios');
const multer = require('multer');
const mimeTypes = require('mime-types');

let errorArchivo = false;

const storage = multer.diskStorage({ 
    destination: 'pdfs',
    filename: function(req, file, cb){
            cb("",Date.now() +'.'+ mimeTypes.extension(file.mimetype));
    }
});

const upload = multer({
    storage
});


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

router.get('/pdfs', (req, res)=>{
    res.render('pdfs', {
        title: 'pdfs',
        script: '/js/pdfs'
    });
});

router.post('/pdfs', upload.single('pdf'),(req, res)=>{
    res.send('hola');
    if(errorArchivo){
        res.send('archivo inválido');
    }else{
        res.send('archivo subido exitosamente');
    }
});

module.exports = router;
