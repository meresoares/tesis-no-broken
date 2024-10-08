import React from 'react';

interface ResultEvaluationProps {
  resultado: string;
}

const ResultEvaluation: React.FC<ResultEvaluationProps> = ({ resultado }) => {
  const generarConsejos = (resultado: string): string[] => {
    switch (resultado) {
      case 'Ansiedad Social Baja':
        return [
          'Tómate el tiempo para aprender sobre la ansiedad social y cómo afecta tu vida. Comprender la naturaleza de tus síntomas puede ser el primer paso hacia el manejo efectivo.',
          'Practica técnicas de respiración profunda, meditación o yoga para ayudar a reducir el estrés y la tensión física.',
          'Dedica tiempo a actividades que disfrutes y te hagan sentir bien contigo mismo. Esto puede ayudar a aumentar tu autoestima y proporcionarte una sensación de logro fuera del ámbito social.',
          'Comparte tus preocupaciones con amigos de confianza. A menudo, hablar sobre tus sentimientos puede aliviar la carga emocional y ayudarte a sentirte menos solo en tus luchas.'
        ];
      case 'Ansiedad Social Moderada':
        return [
          'Tómate el tiempo para aprender sobre la ansiedad social y cómo afecta tu vida. Comprender la naturaleza de tus síntomas puede ser el primer paso hacia el manejo efectivo.',
          'Busca la ayuda de un terapeuta especializado en trastornos de ansiedad. La terapia cognitivo-conductual (TCC) ha demostrado ser especialmente efectiva en el tratamiento de la ansiedad social.',
          'Practica técnicas de respiración profunda, meditación o yoga para ayudar a reducir el estrés y la tensión física.',
          'Busca el apoyo de amigos, familiares o grupos de apoyo. Compartir tus experiencias con otros puede ser reconfortante y útil.',
          'No descuides tu salud física y emocional. Dedica tiempo a actividades que disfrutes y que te ayuden a reducir el estrés.'
        ];
      case 'Ansiedad Social Alta':
        return [
          'Busca la ayuda de un terapeuta especializado en trastornos de ansiedad. La terapia cognitivo-conductual (TCC) ha demostrado ser especialmente efectiva en el tratamiento de la ansiedad social.',
          'Únete a grupos de apoyo en línea o fuera de línea donde puedas compartir tus experiencias con otros que también luchan contra la ansiedad social. El apoyo de personas que entienden lo que estás pasando puede ser invaluable.',
          'Sé amable contigo mismo y reconoce que lidiar con la ansiedad social puede ser desafiante. Aprende a aceptarte a ti mismo tal como eres y celebra cada pequeño avance en tu camino hacia el bienestar.',
          'Prioriza el cuidado de tu cuerpo a través de una alimentación saludable, ejercicio regular y suficiente descanso. Un estilo de vida saludable puede ayudar a reducir los síntomas físicos de la ansiedad y mejorar tu estado de ánimo general.',
          'Cultiva relaciones positivas y de apoyo con personas que te acepten y te valoren tal como eres. El apoyo social puede ser un factor protector importante en el manejo de la ansiedad social.'
        ];
      default:
        return [];
    }
  };

  const consejos = generarConsejos(resultado);
  const buttonClass = resultado.includes('Alta') ? 'high' : resultado.includes('Moderada') ? 'moderate' : '';

  return (
    <div className="vlad_result_container">
      <button className={`vlad_result_button ${buttonClass}`}>{resultado}</button>
      <div className='question-container'>
      <div className="mere_p">
        <p>Es importante recordar que este test proporciona una indicación general y no puede sustituir el diagnóstico realizado por un profesional de la salud mental. Si sientes que la ansiedad social está afectando significativamente tu vida, te recomendamos buscar ayuda de un terapeuta o psicólogo.</p>
      </div>
        <div className='vlad_tooltip_container'>
          <p className='vlad_tooltip'>¡Haz un Screenshot<br/> de los consejos! :D</p>
        </div>
        <div className='vlad_result_device'>
          <h3>Aquí tienes <br/> algunos consejos:</h3>
        </div>
        <div className='vlad_result_advice'>
          <ul>
            {consejos.map((consejo, index) => (
              <li key={index}>{consejo}</li>
            ))}
          </ul>
        </div>
      </div>
      <p>*Recuerda que el manejo de la ansiedad social puede ser un proceso gradual. Sé paciente contigo mismo y no dudes en buscar ayuda si sientes que la situación se vuelve abrumadora.</p>
    </div>
  );
};

export default ResultEvaluation;
