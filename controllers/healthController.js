const db = require('../db');

const getHealth = async (req, res) => {
  try {
    const result = await db.query('SELECT NOW()');

    res.json({
      message: 'Jornada Flow API funcionando',
      database: 'Conectada',
      time: result.rows[0].now,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Error conectando a la base de datos',
    });
  }
};

module.exports = {
  getHealth,
};
