const jwt = require('jsonwebtoken');
const {secretKey} = require('../config');

module.exports = {
  vS: string => {
    if (
      string.indexOf('!') > 0 ||
      string.indexOf('"') > 0 ||
      string.indexOf('#') > 0 ||
      string.indexOf('$') > 0 ||
      string.indexOf('%') > 0 ||
      string.indexOf('&') > 0 ||
      string.indexOf('/') > 0 ||
      string.indexOf('(') > 0 ||
      string.indexOf(')') > 0 ||
      string.indexOf('=') > 0 ||
      string.indexOf('?') > 0 ||
      string.indexOf('¡') > 0 ||
      string.indexOf("'") > 0 ||
      string.indexOf('¿') > 0 ||
      string.indexOf('|') > 0 ||
      string.indexOf('+') > 0 ||
      string.indexOf('*') > 0 ||
      string.indexOf('}') > 0 ||
      string.indexOf('{') > 0 ||
      string.indexOf('`') > 0 ||
      string.indexOf('>') > 0 ||
      string.indexOf('<') > 0
    ) {
      return false;
    } else {
      return true;
    }
  },

  validarEmail: email => {
    if (email.indexOf('.') > 0 && email.indexOf('@')) {
      return true;
    } else {
      return false;
    }
  },
  verifyToken: async (req, res, next) => {
    let getToken = localStorage.getItem('token');
    try {
      const token = await jwt.verify(getToken, secretKey);
      req.token = token;
      next();
    } catch (e) {
      res.redirect('/login');
    }
  },
  re: (message, res)=>{
    res.send({
        error: true,
        message
    })
  }
};
