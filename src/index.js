const express = require('express'); 
const exHbs = require('express-handlebars');
const path = require('path');
const cookieParser = require('cookie-parser');
const pool = require('./dbUsuarios');
const { createPool } = require("mysql");

//Initializations
const app = express();

//Settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));

app.engine('.hbs', exHbs({ 
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
})); 
app.set('view engine', '.hbs');

app.use(express.urlencoded({extended: false})); 
app.use(express.json());
app.use(cookieParser());

//Routes
app.use(require('./routes/'));
app.use(require('./routes/login_signup'));

app.use('/app',function (req, res, next){

    const {cookies} = req;
 
    if('documentoPPE' in cookies && 'passPPE' in cookies){
        pool.getConnection((err, connection)=>{
            if(err){
                res.redirect('/login');
            }
            else{
                next();
            }
        });
    }else{
        res.redirect('/kim');
    }
});

//sdmañsdma
app.use('/app', require('./routes/app'));

//Public
app.use(express.static(path.join(__dirname, 'public')));

//server
app.listen(app.get('port'), ()=>{
    console.log(`Server on port ${app.get('port')}`);
});