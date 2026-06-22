-- 1. Creación de tablas
CREATE TABLE IF NOT EXISTS alumnos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    edad INT
);

CREATE TABLE IF NOT EXISTS especialidades (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS profesores (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    especialidad_id INT REFERENCES especialidades(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS cursos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    cantidad_matriculas INT DEFAULT 0,
    profesor_id INT REFERENCES profesores(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS matriculas (
    id SERIAL PRIMARY KEY,
    alumno_id INT REFERENCES alumnos(id) ON DELETE CASCADE,
    curso_id INT REFERENCES cursos(id) ON DELETE CASCADE
);

-- 2. Inserción de datos iniciales (opcional, para pruebas)
INSERT INTO especialidades (nombre) VALUES 
('Programación'), 
('Data Mining'), 
('Diseño UX');

INSERT INTO profesores (nombre, especialidad_id) VALUES 
('Dr. Smith', 1), 
('Dra. Jones', 2);

INSERT INTO alumnos (nombre, edad) VALUES 
('Ana', 20), 
('Luis', 22), 
('Marta', 20);

INSERT INTO cursos (nombre, cantidad_matriculas, profesor_id) VALUES 
('Backend Node', 2, 1), 
('Análisis de Datos', 1, 2);

INSERT INTO matriculas (alumno_id, curso_id) VALUES 
(1, 1), 
(2, 1), 
(3, 2);