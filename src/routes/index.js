const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const pool = require('../dbUsuarios');

router.get('/home', (req, res)=>{
    // pool.getConnection(()=>{

    // });
    res.render('home/home', {
        results
    });
});

router.get('/contactos', (req, res)=>{

});

/* TODOS LOS ARCHIVOS HTML COMO TAL, van a estar dentro de la carptea views.. y los archivos
de CSS o JS van a estar dentro de la carpeta public

el javascript del fronted esta 

*/

module.exports = router;