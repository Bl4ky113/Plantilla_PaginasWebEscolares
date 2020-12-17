const mysql = require('mysql');
const {promisify} = require('util');
const {host} = require('./config');

const database = {
    
}
 
const pool = mysql.createPool(database); 

pool.getConnection((err, connection)=>{
    if(err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.log('DATABASE CONNECTION WAS CLOSED');
        } else if(err.code === 'ER_CON_COUNT_ERROR'){
            console.log('DATABASE HAS TO MANY CONNECTIONS');
        } else if (err.code === 'ECONNREFUSED'){
            console.log('DATABASE CONNECTION WAS REFUSED');
        }
    } 
    if(connection) connection.release();
    console.log('DB is Connected');
    return;
}); 

// cada vez que hago una consulta, convierto los callbacks en promesas :D
pool.query = promisify(pool.query);

module.exports = pool; 