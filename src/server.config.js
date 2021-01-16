const exHbs = require('express-handlebars');
const path = require('path');
const express = require('express');

module.exports = app => {
  //Settings
  app.set('port', process.env.PORT || 4000);
  app.set('views', path.join(__dirname, 'views'));

  app.engine(
    '.hbs',
    exHbs({
      defaultLayout: 'main',
      layoutsDir: path.join(app.get('views'), 'layouts'),
      partialsDir: path.join(app.get('views'), 'partials'),
      extname: '.hbs',
      helpers: require('./lib/handlebars'),
    })
  );
  app.set('view engine', '.hbs');

  app.use(express.urlencoded({extended: false}));
  app.use(express.json());

  //App Routes
  app.use(require('./routes/'));
  app.use(require('./routes/app/home'));
  app.use(require('./routes/app/actividades'));
  app.use(require('./routes/app/anuncios'));

  //Out Routes
  app.use(require('./routes/out/login_signup'));
  app.use(require('./routes/out/contacto'));

  //Public
  app.use(express.static(path.join(__dirname, 'public')));

  app.use((req, res) => {
      res.send('404 pagina no encontrada crack');
  });
};
