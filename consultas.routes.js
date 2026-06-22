const express = require('express');
const router = express.Router();
const pool = require('./db');

// 1. Alumnos por edad específica
router.get('/alumnos/por-edad', async (req, res) => {
    const { edad } = req.query;
    try {
        const result = await pool.query('SELECT * FROM alumnos WHERE edad = $1', [edad]);
        res.json(result.rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// 2. Alumnos en rango de edad
router.get('/alumnos/rango', async (req, res) => {
    const { min, max } = req.query;
    try {
        const result = await pool.query('SELECT * FROM alumnos WHERE edad BETWEEN $1 AND $2', [min, max]);
        res.json(result.rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// 3. Cursos con mayor cantidad de matrículas (Subconsulta)
router.get('/cursos/top-matriculados', async (req, res) => {
    try {
        const sql = `SELECT * FROM cursos WHERE cantidad_matriculas = (SELECT MAX(cantidad_matriculas) FROM cursos)`;
        const result = await pool.query(sql);
        res.json(result.rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// 4. Detalle de matrículas (JOIN 2 tablas)
router.get('/matriculas/info', async (req, res) => {
    try {
        const sql = `SELECT a.nombre AS alumno, c.nombre AS curso 
                     FROM matriculas m 
                     JOIN alumnos a ON m.alumno_id = a.id 
                     JOIN cursos c ON m.curso_id = c.id`;
        const result = await pool.query(sql);
        res.json(result.rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// 5. Reporte completo (JOIN 3 tablas: Profesor, Curso, Especialidad)
router.get('/profesores/detalle', async (req, res) => {
    try {
        const sql = `SELECT p.nombre AS profesor, c.nombre AS curso, e.nombre AS especialidad 
                     FROM profesores p 
                     JOIN cursos c ON p.id = c.profesor_id 
                     JOIN especialidades e ON p.especialidad_id = e.id`;
        const result = await pool.query(sql);
        res.json(result.rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// 6. Total de alumnos por curso (GROUP BY)
router.get('/cursos/total-alumnos', async (req, res) => {
    try {
        const sql = `SELECT c.nombre, COUNT(m.id) AS total_alumnos 
                     FROM cursos c 
                     LEFT JOIN matriculas m ON c.id = m.curso_id 
                     GROUP BY c.nombre`;
        const result = await pool.query(sql);
        res.json(result.rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

// 7. Cursos con más de X alumnos (GROUP BY + HAVING)
router.get('/cursos/populares', async (req, res) => {
    const { min } = req.query;
    try {
        const sql = `SELECT c.nombre, COUNT(m.id) AS total 
                     FROM cursos c 
                     JOIN matriculas m ON c.id = m.curso_id 
                     GROUP BY c.nombre 
                     HAVING COUNT(m.id) >= $1`;
        const result = await pool.query(sql, [min]);
        res.json(result.rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;