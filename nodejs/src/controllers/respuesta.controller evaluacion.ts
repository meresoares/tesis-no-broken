import { Request, Response } from 'express';
import RespuestaService from '../services/respuesta.service evaluacion';
import { QueryTypes } from 'sequelize';
import { QueryResultRow } from '../types/query.result';
import { sequelize } from '../config/config';

/**
 * Controlador para manejar las solicitudes relacionadas con las respuestas.
 */
class RespuestaController {

  /**
  * Crea una nueva respuesta.
  * @param req La solicitud HTTP que contiene los datos de la nueva respuesta.
  * @param res La respuesta HTTP.
  */

  async createRespuesta(req: Request, res: Response): Promise<void> {
    try {
      const respuestaConEvaluacion = await RespuestaService.createRespuesta(req.body);
      res.status(201).json(respuestaConEvaluacion);
    } catch (error: any) {
      // Manejo de errores específicos
      if (error.message.startsWith('Validation Error')) {
        res.status(400).json({ message: error.message });
      } else if (error.message.startsWith('Database Error')) {
        res.status(500).json({ message: error.message });
      } else {
        // Error genérico
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
      }
    }
  }

  async getRespuestaByPersonaId(req: Request, res: Response): Promise<void> {
    try {
      const personaId = req.params.personaId;
      const resultado = await RespuestaService.getRespuestaByPersonaId(personaId);
      if (resultado) {
        res.status(200).json({ resultado });
      } else {
        res.status(404).json({ message: 'No se encontró el resultado para este usuario' });
      }
    } catch (error: any) {
      res.status(500).json({ message: 'Error al obtener el resultado', error: error.message });
    }
  }

  async getEvaluaciones(req: Request, res: Response): Promise<void> {
    try {
      const sql = `
          SELECT
              personas.id AS id_persona,
              personas.fecha_nacimiento,
              MAX(respuestas.fecha_respuesta) AS fecha_evaluacion,
              MAX(respuestas.evaluacion) AS evaluacion
          FROM
              personas
          JOIN
              respuestas ON personas.id = respuestas.persona_id
          GROUP BY
              personas.id, personas.fecha_nacimiento;
      `;

      const results = await sequelize.query(sql, {
        type: QueryTypes.SELECT,
      });

      res.status(200).json(results);
    } catch (error: any) {
      console.error('Error al obtener el resumen de evaluaciones:', error);
      res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
  }

  async getRespuestasDetalles(req: Request, res: Response): Promise<void> {
    try {
      const { personaId } = req.params;
      console.log('ID de Persona:', personaId);  // Agrega esta línea para depuración

      if (!personaId) {
        res.status(400).json({ message: 'ID de persona no proporcionado.' });
        return;
      }

      const sql = `
              SELECT
          personas.id AS id_persona,
          personas.fecha_nacimiento,
          personas.universidad,
          personas.carrera,
          personas.sexo,
          preguntas.id AS id_pregunta,
          preguntas.descripcion AS texto_pregunta,
          respuestas.respuesta AS texto_respuesta,
          respuestas.evaluacion,
          respuestas.fecha_respuesta
        FROM
          respuestas
        JOIN
          personas ON respuestas.persona_id = personas.id
        JOIN
          preguntas ON respuestas.pregunta_id = preguntas.id
        WHERE
            personas.id = ?
        ORDER BY
          respuestas.fecha_respuesta DESC;
          `;

      const results = await sequelize.query<QueryResultRow>(sql, {
        replacements: [personaId],
        type: QueryTypes.SELECT,
      });

      if (results.length === 0) {
        res.status(404).json({ message: 'No se encontraron datos para la persona con el ID proporcionado.' });
        return;
      }

      const personaData = {
        id_persona: results[0].id_persona,
        fecha_nacimiento: results[0].fecha_nacimiento,
        universidad: results[0].universidad,
        carrera: results[0].carrera,
        sexo: results[0].sexo,
        evaluacion: results[0].evaluacion,
        fecha_respuesta: results[0].fecha_respuesta,
        preguntas_respuestas: results.map(row => ({
          id_pregunta: row.id_pregunta,
          texto_pregunta: row.texto_pregunta,
          texto_respuesta: row.texto_respuesta,
        }))
      };

      res.status(200).json(personaData);

    } catch (error: any) {
      console.error('Error al obtener respuestas con datos:', error);
      res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    }
  }

}

export default new RespuestaController();
