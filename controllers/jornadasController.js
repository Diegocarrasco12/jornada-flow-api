const db = require('../db');

const getJornadas = async (req, res) => {
  try {
    const result = await db.query(`
      SELECT
        id,
        trabajador AS grupo,
        'Turno' AS turno,
        fecha AS "horaInicio",
        COALESCE(nota, '') AS nota,
        latitud,
        longitud,
        precision_gps
      FROM jornadas
      ORDER BY id DESC
    `);

    res.json(result.rows);
  } catch (error) {
    console.error('Error obteniendo jornadas:', error);

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

    res.status(201).json({
      id: result.rows[0].id,
      grupo: result.rows[0].trabajador,
      turno: 'Turno',
      horaInicio: result.rows[0].fecha,
      nota: '',
      latitud: result.rows[0].latitud,
      longitud: result.rows[0].longitud,
      precision_gps: result.rows[0].precision_gps,
    });

  } catch (error) {
    console.error('Error creando jornada:', error);

    res.status(500).json({
      message: 'Error creando jornada',
    });
  }
};

module.exports = {
  getJornadas,
  createJornada,
};
