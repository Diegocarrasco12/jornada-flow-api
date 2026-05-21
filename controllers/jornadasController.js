const db = require('../db');

const getJornadas = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT *
      FROM jornadas
      ORDER BY id DESC
    `);

    res.json(result.rows);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Error obteniendo jornadas',
    });
  }
};

const createJornada = async (req, res) => {
  try {
    const {
      trabajador,
      fecha,
      latitud,
      longitud,
      precision_gps,
    } = req.body;

    const result = await db.query(
      `
      INSERT INTO jornadas (
        trabajador,
        fecha,
        latitud,
        longitud,
        precision_gps
      )
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
      `,
      [
        trabajador,
        fecha,
        latitud,
        longitud,
        precision_gps,
      ]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: 'Error creando jornada',
    });
  }
};

module.exports = {
  getJornadas,
  createJornada,
};
