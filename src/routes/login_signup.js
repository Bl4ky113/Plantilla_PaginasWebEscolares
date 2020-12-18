const express = require("express");
const router = express.Router();
const cookieParser = require("cookie-parser");
const { validarSimbolosString, validarEmail } = require("../lib/helpers");
const { createPool } = require("mysql");
const pool = require("../dbUsuarios");
const bcrypt = require("bcrypt");

router.get("/signup", (req, res) => {
  res.send("funcionando...");
});

router.get("/login", (req, res) => {
  res.send("hola mundo");
});

router.post("/signup", (req, res) => {
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
    nombre === "" ||
    correo === "" ||
    numTelefono === "" ||
    password === "" ||
    pass2 === "" ||
    documento === "" ||
    TD === "" ||
    rol === "" ||
    institucion === ""
  ) {
    res.send({
      error: true,
      mensaje: "Porfavor rellene correctamente todos los campos.",
    });
  } else {
    if (validarEmail(correo)) {
      if (
        validarSimbolosString(nombre) &&
        validarSimbolosString(correo) &&
        validarSimbolosString(numTelefono) &&
        validarSimbolosString(documento) &&
        validarSimbolosString(TD) &&
        validarSimbolosString(rol) &&
        validarSimbolosString(institucion)
      ) {
        if (password === pass2) {
          pool.getConnection((err, connection) => {
            if (err) {
              connection.destroy();
              res.send({
                error: true,
                mensaje: "Lo sentimos, ha ocurrido un error, intente de nuevo",
              });
            } else {
              bcrypt.hash(password, 10, (err, passEncriptada) => {
                if (err) {
                  connection.destroy();
                  res.send({
                    error: true,
                    mensaje:
                      "Lo sentimos, ha ocurrido un error, intente de nuevo",
                  });
                } else {
                  pool.query(
                    `SELECT * FROM instituciones WHERE nombreInstitucion = ?`,
                    [institucion],
                    (error, results, fields) => {
                      if (error) {
                        connection.destroy();
                        res.send({
                          error: true,
                          mensaje:
                            "Lo sentimos, ha ocurrido un error, intente de nuevo.",
                        });
                      } else {
                        if (results.length === 0) {
                          connection.destroy();
                          res.send({
                            error: true,
                            mensaje:
                              "Lo sentimos, ha ocurrido un error, intente de nuevo",
                          });
                        } else {
                          pool.query(
                            "INSERT INTO usuarios_generales set ?",
                            [
                              {
                                nombreUsuario: nombre,
                                correoUsuario: correo,
                                numeroTelefono: numTelefono,
                                passUsuario: passEncriptada,
                                numDocumento: documento,
                                tipoDocumento: TD,
                                rol: rol,
                                fk_IDinstitucion: results[0].IDinstitucion,
                              },
                            ],
                            (error, results, fields) => {
                              if (error) {
                                if (error.errno === 1062) {
                                  connection.destroy();
                                  res.send({
                                    error: true,
                                    mensaje:
                                      "El correo o el documento de identidad ingresado ya se encuentra registrado",
                                  });
                                } else {
                                  connection.destroy();
                                  res.send({
                                    error: true,
                                    mensaje:
                                      "Lo sentimos, ha ocurrido un error, intente de nuevo",
                                  });
                                }
                              } else {

                                res.cookie('documentoPPE', documento);
                                res.cookie('passPPE', password);
                          
                                switch(rol){
                                  case 'profesor':
                                     res.send({
                                       error: false,
                                       redirect: '/signup/profesor'
                                     });
                                  break;

                                  case 'estudiante':
                                    res.send({
                                      error: false,
                                      redirect: '/signup/estudiante'
                                    });
                                  break;

                                  case 'directriz':
                                    res.send({
                                      error: false,
                                      redirect: '/signup/directriz'
                                    });
                                  break;
                                  
                                  default:
                                    res.send({
                                      error: true,
                                      mensaje: ''
                                    });
                                  break;
                                }
                              }
                            }
                          );
                        }
                      }
                    }
                  );
                }
              });
            }
          });
        } else {
          res.send({
            error: true,
            mensaje: "Las contraseñas no coinciden",
          });
        }
      } else {
        res.send({
          error: true,
          mensaje:
            'Porfavor no utilize simbolos no permitidos como !"#$%&/=? etc.',
        });
      }
    } else {
      res.send({
        error: true,
        mensaje: "Correo invalido",
      });
    }
  }
});

router.get('/signup/:rol', (req, res)=> {

  let {rol} = req.params;

  rol = rol.trim();

  switch(rol){
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

router.post('signup/:rol', (req, res)=>{

  let {rol} = req.body;
  
  switch(rol){
    case 'profesor':
       let {asignatura, gradosDictados} = req.body;

       asignatura = asignatura.trim();
       gradosDictados = gradosDictados.trim();

       if(asignatura === '' || grado === ''){
         res.send({
           error: true,
           mensaje: 'Porfavor rellene correctamente todos los campos'
         });
       }else{
         if(validarSimbolosString(asignatura) && validarSimbolosString(gradosDictados)){
          
         }else{
          res.send({
            error: true,
            mensaje: 'Porfavor no coloque simbolo no permitidos como !"#$%&/ etc'
          });
         }
       }
    break;

    case 'estudiante':
      let {grado} = req.body;
      grado = grado.trim();

      if(grado === ''){
        res.send({
          error: true,
          mensaje: 'Porfavor rellene correctamente todos los campos.'
        });
      }else{
        if(validarSimbolosString(grado)){
          
        } else {
          res.send({
            error: true,
            mensaje: 'Porfavor no ingrese simbolos no permitiddos como !"#$%&/ etc'
          })
        }
      }
    break;

    case 'directriz':
      let {cargo} = req.body;

      cargo = cargo.trim();

      if(cargo === ''){
        res.send({
          error: true,
          mensaje: 'Porfavor rellene correctamente todos los campos.'
        });
      }else{
        if(validarSimbolosString(grado)){
          
        } else {
          res.send({
            error: true,
            mensaje: 'Porfavor no ingrese simbolos no permitiddos como !"#$%&/ etc'
          })
        }
      }
    break;

    default:
      res.redirect('/PPE');
    break;
  }
});

router.post("/login", (req, res) => {
  let { correo, password } = req.body;
  
  correo = correo.trim();
  password = password.trim();

  if(correo === '' || password === ''){
    res.send({
      error: true,
      mensaje: 'Porfavor rellene correctamente todos los campos'
    });
  }else{
    if(validarEmail(correo) && validarSimbolosString(correo)){
      pool.getConnection((err, connection)=>{
        if(err){
          connection.destroy();
          res.send({            
            error: true,
            mensaje: 'Ha ocurrido un error, intente de nuevo.'
          });
        }else{
          
          pool.query('SELECT * FROM usuarios_generales WHERE correoUsuario = ?', [
            correo
          ],(error, results)=>{
            if(error){
              connection.destroy();
              res.send({
                error: true,
                mensaje: 'Ha ocurrido un error query correo.'
              });
            }else{
              if(results.length == 0){
                connection.destroy();
                res.send({
                  error: true,
                  mensaje: 'Correo y/o contraseña incorrecto.'
                });
              }else{
                bcrypt.compare(password, results[0].passUsuario, (err, coinciden)=>{
                  if(err){
                    connection.destroy();
                    res.send({
                      error: true,
                      mensaje: 'Ha ocurrido un error bcrypt compare.'
                    });
                  }else{
                    if(coinciden){
                      connection.destroy();
                      res.send({
                        error: false
                      });
                    }else{
                      connection.destroy();
                      res.send({
                        error: true,
                        mensaje: 'Correo y/o contraseña incorrecto'
                      });
                    }
                  }
                });
              }
            }
          });
        }
      });
    }
    else{
      res.send({
        error: true,
        mesaje: 'Su correo es invalido o contiene simbolos no permitidos.'
      });
    }
  }
});

module.exports = router;
