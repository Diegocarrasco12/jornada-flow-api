const express = require('express');
const cors = require('cors');
require('dotenv').config();

const healthRoutes = require('./routes/healthRoutes');
const jornadasRoutes = require('./routes/jornadasRoutes');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/', healthRoutes);
app.use('/jornadas', jornadasRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
