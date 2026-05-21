const express = require('express');
const cors = require('cors');
require('dotenv').config();

const healthRoutes = require('./routes/healthRoutes');
const jornadasRoutes = require('./routes/jornadasRoutes');

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json());

// Rutas
app.use('/', healthRoutes);
app.use('/jornadas', jornadasRoutes);

// Puerto
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
