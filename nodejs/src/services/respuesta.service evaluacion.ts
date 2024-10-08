import Respuesta from '../models/respuesta.models';
import { ValidationError } from 'sequelize';

// Definición de tipos para las respuestas
type RespuestaValue = 'Nada' | 'Muy poco' | 'Un poco' | 'Mucho' | 'Demasiado';
type Respuestas = Array<{ pregunta_id: number; respuesta: RespuestaValue }>;
type ValoresRespuestas = Record<RespuestaValue, number>;

class SistemaExperto {
  private valores: ValoresRespuestas = {
    'Nada': 0,
    'Muy poco': 1,
    'Un poco': 2,
    'Mucho': 3,
    'Demasiado': 4,
  };

  // Evalúa las respuestas basándose en la puntuación total
  evaluarRespuestas(respuestas: Respuestas): string {
    let puntuacion = 0;
    for (const { respuesta } of respuestas) {
      console.log(`Respuesta: ${respuesta} (${this.valores[respuesta]})`);
      puntuacion += this.valores[respuesta];
    }

    // Depuración: Imprimir la puntuación total
    console.log(`Puntuación total: ${puntuacion}`);

    // Clasifica el nivel de ansiedad basado en la puntuación
    if (puntuacion <= 20) {
      return 'Ansiedad Social Baja';
    } else if (puntuacion > 20 && puntuacion <= 40) {
      return 'Ansiedad Social Moderada';
    } else {
      return 'Ansiedad Social Alta';
    }
  }
}

interface CreateRespuestasData {
  persona_id: string;
  respuestas: Respuestas;
}

class RespuestaService {
  private sistemaExperto: SistemaExperto = new SistemaExperto();

  async createRespuesta(data: CreateRespuestasData): Promise<{ resultado: string; respuestas: Respuesta[] }> {
    try {
      const { persona_id, respuestas } = data;
      
      // Verificar si la persona ya ha respondido
      const existingResponse = await Respuesta.findOne({ where: { persona_id } });
      if (existingResponse) {
        throw new Error("Esta persona ya ha respondido el formulario.");
      }
      // Calcula la evaluación
      const evaluacion = this.sistemaExperto.evaluarRespuestas(respuestas);
      console.log(`Evaluación calculada: ${evaluacion}`); // Depuración

      // Verifica que 'evaluacion' no sea 'null'
      if (!evaluacion) {
        throw new Error("La evaluación no se ha calculado correctamente.");
      }

      // Crea las respuestas con la evaluación incluida
      const respuestasConEvaluacion = respuestas.map(respuesta => ({
        ...respuesta,
        persona_id,
        evaluacion, // Asegúrate de que el modelo Sequelize tiene este campo.
      }));

      const createdRespuestas = await Respuesta.bulkCreate(respuestasConEvaluacion);

      console.log(`Respuestas creadas con evaluación: ${createdRespuestas.map(r => r.evaluacion)}`); // Depuración

      // Devuelve el resultado de la evaluación junto con las respuestas creadas
      return { resultado: evaluacion, respuestas: createdRespuestas };
    } catch (error: any) {
      console.error('Error al crear la respuesta:', error); // Depuración
      if (error instanceof ValidationError) {
        throw new Error(`Validation Error: ${error.message}`);
      } else {
        throw new Error(`Database Error: ${error.message}`);
      }
    }
  }

  async getRespuestaByPersonaId(personaId: string): Promise<string | null> {
    try {
      const respuesta = await Respuesta.findOne({ where: { persona_id: personaId } });
      return respuesta && respuesta.evaluacion !== undefined ? respuesta.evaluacion : null;
    } catch (error: any) {
      console.error('Error al obtener el resultado:', error);
      throw new Error(`Database Error: ${error.message}`);
    }
  }

  async checkUserStatus(personaId: string): Promise<{ status: string; evaluacion?: string }> {
    try {
      const evaluacion = await this.getRespuestaByPersonaId(personaId);
      if (evaluacion) {
        return { status: 'responded', evaluacion };
      } else {
        return { status: 'not-responded' };
      }
    } catch (error: any) {
      console.error('Error al verificar el estado del usuario:', error);
      throw new Error(`Database Error: ${error.message}`);
    }
  }

}

export default new RespuestaService();