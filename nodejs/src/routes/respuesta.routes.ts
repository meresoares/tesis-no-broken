import { Router } from 'express';
import RespuestaController from '../controllers/respuesta.controller evaluacion';
import respuestaServiceEvaluacion from '../services/respuesta.service evaluacion';

const router = Router();

router.post('/respuestas', RespuestaController.createRespuesta);
router.post('/respuestas-ev', RespuestaController.createRespuesta);
router.get('/respuestas/:personaId', RespuestaController.getRespuestaByPersonaId);
router.get('/evaluaciones', RespuestaController.getEvaluaciones);
router.get('/detalle/:personaId', RespuestaController.getRespuestasDetalles);
router.get('/user-status/:personaId', respuestaServiceEvaluacion.checkUserStatus);


// Rutas adicionales si son necesarias

export default router;
