const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');

router.get('/signup', (req, res)=>{
    res.render('');
});

router.get('/login', (req, res)=>{
    res.render('');
});

router.post('/signup', (req, res)=>{
    const {nombre, correo, pass, documento, TD} = req.body;
});

router.post('/login', (req, res)=>{
    const {correo, pass} = req.body;
});

module.exports = router;