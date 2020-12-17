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
  res.render("");
});

router.post("/signup", (req, res) => {
  let {
    nombre,
    correo,
    password,
    pass2,
    documento,
    TD,
    rol,
    institucion,
  } = req.body;

  nombre = nombre.trim();
  correo = correo.trim();
  password = password.trim();
  pass2 = pass2.trim();
  documento = documento.trim();
  TD = TD.trim();
  rol = rol.trim();
  institucion = institucion.trim();

  if (
    nombre === "" ||
    correo === "" ||
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
        validarSimbolosString(password) &&
        validarSimbolosString(pass2) &&
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
                    `SELECT * FROM instituciones WHERE nombreInstitucion = '${institucion}'`,
                    (error, results, fields) => {
                      if (error) {
                        connection.destroy();
                        res.send({
                          error: true,
                          mensaje:
                            "Lo sentimos, ha ocurrido un error, intente de nuevo query institcuion",
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
                                passUsuario: passEncriptada,
                                numDocumento: documento,
                                tipoDocumento: TD,
                                rol: rol,
                                fk_IDinstitucion: results[0].IDinstitucion,
                              },
                            ],
                            (error, results, fields) => {
                              if (error) {
                                connection.destroy();
                                res.send({
                                  error,
                                });
                              } else {
                                connection.destroy();
                                res.send({
                                  error: false,
                                });
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

router.post("/login", (req, res) => {
  const { correo, pass } = req.body;
});

module.exports = router;
