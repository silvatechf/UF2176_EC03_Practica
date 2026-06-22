require('dotenv').config();
const express = require('express');
const app = express();
const consultasRoutes = require('./consultas.routes'); // El archivo con los 7 endpoints

app.use(express.json()); // Permite recibir JSON en los requests

// Montamos las rutas bajo /api
app.use('/api/consultas', consultasRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});