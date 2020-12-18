-- Tabla instituciones
create table instituciones (
    IDinstitucion INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombreInstitucion VARCHAR(250) NOT NULL UNIQUE, 
    direccion VARCHAR(250),
    fechaRegistroInstitucion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de usuarios generales
create table usuarios_generales (
    IDusuario INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombreUsuario VARCHAR(250) NOT NULL,
    correoUsuario VARCHAR(300) NOT NULL UNIQUE, 
    numeroTelefono VARCHAR(50),
    passUsuario VARCHAR(300) NOT NULL,
    numDocumento VARCHAR(50) NOT NULL UNIQUE,
    tipoDocumento VARCHAR(50) NOT NULL,
    rol VARCHAR(100) NOT NULL,
    fechaRegistroUsuario TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fk_IDinstitucion INT(6) UNSIGNED
);
ALTER TABLE `usuarios_generales` ADD FOREIGN KEY (`fk_IDinstitucion`) REFERENCES `instituciones` (`IDinstitucion`) ON UPDATE CASCADE ON DELETE CASCADE;

-- Tabla de profesores
create table profesores (
    fk_IDinstitucion INT(6) UNSIGNED,
    fk_IDusuario INT(6) UNSIGNED,
    IDprofesor INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    asignatura VARCHAR(200) NOT NULL,
    gradosDictados VARCHAR(200) NOT NULL
);
-- SET THE FOREIGN KEYS AS THE VALUES fk_IDinstitucion AND fk_IDusuario from the tables instituciones y usuarios_generales
ALTER TABLE `profesores` ADD FOREIGN KEY (`fk_IDinstitucion`) REFERENCES `instituciones` (`IDinstitucion`) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE `profesores` ADD FOREIGN KEY (`fk_IDusuario`) REFERENCES `usuarios_generales` (`IDusuario`) ON UPDATE CASCADE ON DELETE CASCADE;


-- Tabla de estudiantes
create table estudiantes (
    fk_IDinstitucion INT(6) UNSIGNED,
    fk_IDusuario INT(6) UNSIGNED,
    grado VARCHAR(50) NOT NULL
);
ALTER TABLE `estudiantes` ADD FOREIGN KEY (`fk_IDinstitucion`) REFERENCES `instituciones` (`IDinstitucion`) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE `estudiantes` ADD FOREIGN KEY (`fk_IDusuario`) REFERENCES `usuarios_generales` (`IDusuario`) ON UPDATE CASCADE ON DELETE CASCADE;


-- Tabla de directrices 
create table directrices (
    fk_IDinstitucion INT(6) UNSIGNED,
    fk_IDusuario INT(6) UNSIGNED,
    cargo VARCHAR(200) NOT NULL
);
ALTER TABLE `directrices` ADD FOREIGN KEY (`fk_IDinstitucion`) REFERENCES `instituciones` (`IDinstitucion`) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE `directrices` ADD FOREIGN KEY (`fk_IDusuario`) REFERENCES `usuarios_generales` (`IDusuario`) ON UPDATE CASCADE ON DELETE CASCADE;

create table asignaturas (
    fk_IDinstitucion INT(6) UNSIGNED,
    fk_IDprofesor INT(6) UNSIGNED,
    IDasignatura INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombreAsignatura VARCHAR(200) NOT NULL,
    gradosVistos VARCHAR(300) NOT NULL
);

ALTER TABLE `asignaturas` ADD FOREIGN KEY (`fk_IDinstitucion`) REFERENCES `instituciones` (`IDinstitucion`) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE `asignaturas` ADD FOREIGN KEY (`fk_IDprofesor`) REFERENCES `profesores` (`IDprofesor`) ON UPDATE CASCADE ON DELETE CASCADE;


-- Agregar el campo "numeroTelefono" a la tabla usuarios_generales
-- ALTER TABLE `usuarios_generales`
-- ADD numeroTelefono VARCHAR(50) AFTER correoUsuario;

-- Unique fields nombreInstitucion VARCHAR(250) NOT NULL, --tabla instituciones....
-- correoUsuario VARCHAR(300) NOT NULL, --tabla usuarios_generales 
-- -- numDocumento VARCHAR(50) NOT NULL, --tabla usuarios_generales
-- ALTER TABLE `usuarios_generales` CHANGE correoUsuario correoUsuario VARCHAR(300) NOT NULL UNIQUE;