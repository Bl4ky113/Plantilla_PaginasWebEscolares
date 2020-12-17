-- Tabla instituciones

create table instituciones (
    IDinstitucion INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombreInstitucion VARCHAR(250) NOT NULL,
    direccion VARCHAR(250),
    fechaRegistroInstitucion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Tabla de usuarios generales
create table usuarios_generales (
    IDusuario INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombreUsuario VARCHAR(250) NOT NULL,
    correoUsuario VARCHAR(300) NOT NULL,
    passUsuario VARCHAR(300) NOT NULL,
    numDocumento VARCHAR(50) NOT NULL,
    tipoDocumento VARCHAR(50) NOT NULL,
    rol VARCHAR(100) NOT NULL,
    fechaRegistroUsuario TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fk_IDinstitucion INT(6) UNSIGNED
);

ALTER TABLE `usuarios_generales` ADD FOREIGN KEY (`fk_IDinstitucion`) REFERENCES `instituciones` (`IDinstitucion`) ON UPDATE CASCADE ON DELETE CASCADE;

-- Tabla de profesores

create table profesores (
    fk_IDinstitucion INT(6) UNSIGNED,
    fk_IDusuario INT UNSIGNED,
    asignatura VARCHAR(200) NOT NULL,
    gradosDictados VARCHAR(200) NOT NULL,
);
