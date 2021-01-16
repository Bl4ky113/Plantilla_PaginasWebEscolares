const express = require('express');
const router = express.Router();
const {vS, validarEmail, re} = require('../../lib/helpers');
const pool = require('../../dbPPE');
const bcrypt = require('bcrypt');
const {host, onTest, secretKey} = require('../../config');
const {promisify} = require('util');
const jwt = require('jsonwebtoken');

router.get('/signup', (req, res) => {
  res.send('funcionando...');
});

router.get('/login', (req, res) => {
  res.send('hola mundo');
});

router.post('/signup', (req, res) => {
  if (req.headers.host !== host) {
    if (onTest) return;
    res.sendStatus(403);
  }

  let {
    nombre,
    correo,
    numTelefono,
    password,
    pass2,
    documento,
    TD,
    rol,
    institucion,
  } = req.body;

  nombre = nombre.trim();
  correo = correo.trim();
  numTelefono = numTelefono.trim();
  password = password.trim();
  pass2 = pass2.trim();
  documento = documento.trim();
  TD = TD.trim();
  rol = rol.trim();
  institucion = institucion.trim();

  if (
    nombre === '' ||
    correo === '' ||
    numTelefono === '' ||
    password === '' ||
    pass2 === '' ||
    documento === '' ||
    TD === '' ||
    rol === '' ||
    institucion === ''
  ) {
    re('Porfavor rellene correctamente todos los campos.', res);
    return;
  }

  if (!validarEmail(correo)) {
    re('Porfavor ingrese un correo válido', res);
    return;
  }

  if (
    !vS(nombre) &&
    !vS(correo) &&
    !vS(numTelefono) &&
    !vS(documento) &&
    !vS(TD) &&
    !vS(rol) &&
    !vS(institucion)
  ) {
    re('Porfavor no utilize simbolos no permitidos como !"#$%&/=? etc.', res);
    return;
  }

  if (password !== pass2) {
    re('Las contraseñas no coinciden', res);
    return;
  }

  pool.getConnection(async (err, connection) => {
    connection.query = promisify(connection.query);
    if (err) {
      connection.release();
      re('Lo sentimos, ha ocurrido un error, intente de nuevo', res);
      return;
    }

    try {
      const passEncriptada = await bcrypt.hash(password, 10);
      const queryInstitucion = await connection.query(
        `SELECT * FROM instituciones WHERE nombreInstitucion = ?`,
        [institucion]
      );

      if (queryInstitucion.length === 0) {
        connection.release();
        re('Lo sentimos ha ocurrido un error', res);
        return;
      }

      await connection.query('INSERT INTO usuarios_generales set ?', [
        {
          nombreUsuario: nombre,
          correoUsuario: correo,
          numeroTelefono: numTelefono,
          passUsuario: passEncriptada,
          numDocumento: documento,
          tipoDocumento: TD,
          rol,
          fk_IDinstitucion: queryInstitucion[0].IDinstitucion,
        },
      ]);

      const queryInfoUser = await connection.query(
        'SELECT * FROM usuarios_generales WHERE  correoUsuario = ?',
        [correo]
      );

      const token = await jwt.sign(
        {
          IDusuario: queryInfoUser[0].IDusuario,
          nombre,
          correo,
          rol,
        },
        secretKey,
        {
          expiresIn: '7d',
        }
      );
      localStorage.setItem('token', token);
      res.send({
        error: false,
      });

      // switch (rol) {
      //   case 'profesor':
      //     //redireccionar a que termine de completar sus datos
      //     // de maestro, el grado en que da y eso
      //     console.log('profesor registrado');
      //     break;
      //   case 'estudiante':
      //     //redireccionarlo a que termine sus datos de estudiante
      //     // el curso que hace, y eso
      //     console.log('estudiante registrado');
      //     break;

      //   case 'directriz':
      //     //redireccionarla a que cumpla sus datos de directriz
      //     //tipo de directriz y eso
      //     console.log('directriz registrada');
      //     break;

      //   default:
      //     re('Lo sentimos ha ocurrido un error, intente de nuevo', res);
      //     break;
      // }
    } catch (e) {
      if (e.errno === 1062) {
        re(
          'El correo o el documento de identidad ingresado ya se encuentra registrado',
          res
        );
        return;
      }
      re('Lo sentimos, ha ocurrido un error, intente de nuevo', res);
    }
  });
});

router.get('/signup/:rol', (req, res) => {
  let {rol} = req.params;

  rol = rol.trim();

  switch (rol) {
    case 'profesor':
      res.render(); // renderizar formulario profesor
      break;

    case 'estudiante':
      res.render(); // renderizar formulario estudiante
      break;

    case 'directriz':
      res.render(); // renderizar formulario directriz
      break;

    default:
      res.redirect('/PPE');
      break;
  }
});

router.post('signup/:rol', (req, res) => {
  let {rol} = req.body;

  switch (rol) {
    case 'profesor':
      let {asignatura, gradosDictados} = req.body;

      asignatura = asignatura.trim();
      gradosDictados = gradosDictados.trim();

      if (asignatura === '' || grado === '') {
        res.send({
          error: true,
          mensaje: 'Porfavor rellene correctamente todos los campos',
        });
      } else {
        if (vS(asignatura) && vS(gradosDictados)) {
        } else {
          res.send({
            error: true,
            mensaje: 'Porfavor no coloque simbolo no permitidos como !"#$%&/ etc',
          });
        }
      }
      break;

    case 'estudiante':
      let {grado} = req.body;
      grado = grado.trim();

      if (grado === '') {
        res.send({
          error: true,
          mensaje: 'Porfavor rellene correctamente todos los campos.',
        });
      } else {
        if (vS(grado)) {
        } else {
          res.send({
            error: true,
            mensaje: 'Porfavor no ingrese simbolos no permitiddos como !"#$%&/ etc',
          });
        }
      }
      break;

    case 'directriz':
      let {cargo} = req.body;

      cargo = cargo.trim();

      if (cargo === '') {
        res.send({
          error: true,
          mensaje: 'Porfavor rellene correctamente todos los campos.',
        });
      } else {
        if (vS(grado)) {
        } else {
          res.send({
            error: true,
            mensaje: 'Porfavor no ingrese simbolos no permitiddos como !"#$%&/ etc',
          });
        }
      }
      break;

    default:
      res.redirect('/PPE');
      break;
  }
});

router.post('/login', (req, res) => {
  let {correo, password} = req.body;

  correo = correo.trim();
  password = password.trim();

  if (correo === '' || password === '') {
    re('Porfavor rellene correctamente todos los campos', res);
    return;
  }

  if (!validarEmail(correo)) {
    re('El correo ingresado es inválido', res);
  }

  pool.getConnection(async (err, connection) => {
    if (err) {
      connection.release();
      re('Ha ocurrido un error, intente de nuevo.', res);
      return;
    }
    try {
      const queryUsers = await pool.query(
        'SELECT * FROM usuarios_generales WHERE correoUsuario = ?',
        [correo]
      );

      if (queryUsers.length == 0) {
        connection.release();
        re('Correo y/o contraseña incorrecto.', res);
        return;
      }

      const coinciden = bcrypt.compare(password, queryUsers[0].passUsuario);

      if (coinciden) {
        connection.release();
        const token = await jwt.sign(
          {
            IDusuario: queryUsers[0].IDusuario,
            nombre: queryUsers[0].nombre,
            correo,
            rol: queryUsers[0].rol
          },
          secretKey,
          {
            expiresIn: '7d',
          }
        );
        localStorage.setItem('token', token);
        res.send({
          error: false,
        });
      } else {
        connection.release();
        re('Correo y/o contraseña incorrecto', res);
      }
    } catch (e) {
      re('Lo sentimos, ha ocurrido un error, intente de nuevo');
    }
  });
});

module.exports = router;
