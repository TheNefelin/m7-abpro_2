
CREATE DATABASE ejercicios;

CREATE TABLE estudiante (  
    id int NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    rut VARCHAR(50),
    nombres VARCHAR(255),
    curso VARCHAR(255),
    nivel INT
);

