const express = require('express');
const router = express.Router();
const pool = require('../../dbPPE');
const { verifyToken } = require('../../lib/helpers');

router.get('/actividades',verifyToken,(req, res)=>{
    
});

module.exports = router;