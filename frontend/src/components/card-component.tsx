import React from 'react';
import { useNavigate } from 'react-router-dom';
import { format, isValid, parseISO } from 'date-fns';

interface CardProps {
    idPersona: string;
    evaluacion: string;
    fechaRespuesta: Date | string | null;
    fechaNacimiento: Date | string | null;
}

const CardComponent: React.FC<CardProps> = ({ idPersona, fechaRespuesta, fechaNacimiento, evaluacion }) => {
    const navigate = useNavigate();

    const parseFecha = (fecha: Date | string | null): Date | null => {
        if (!fecha) return null;
        if (typeof fecha === 'string') {
            const parsedDate = parseISO(fecha);
            return isValid(parsedDate) ? parsedDate : null;
        }
        return isValid(fecha) ? fecha : null;
    };

    const handleNavigation = () => {
        // Aquí puedes pasar cualquier dato adicional necesario
        console.log('Navigating to details with idPersona:', idPersona);
        navigate(`/detalle/${idPersona}`, { state: { evaluacion, fechaRespuesta, fechaNacimiento } });
    };

    const formattedFechaRespuesta = parseFecha(fechaRespuesta)
        ? format(parseFecha(fechaRespuesta)!, 'dd/MM/yyyy')
        : 'Fecha inválida';

    const formattedFechaNacimiento = parseFecha(fechaNacimiento)
        ? format(parseFecha(fechaNacimiento)!, 'dd/MM/yyyy')
        : 'Fecha inválida';

    return (
        <div className="card-body mere_p mb-2">
            <p>{idPersona}</p>
            <p>Evaluación <br /> {evaluacion}</p>
            <p>Fecha de Respuesta <br /> {formattedFechaRespuesta}</p>
            <p>Fecha de Nacimiento <br /> {formattedFechaNacimiento}</p>
            <div className='vlad_details_button' onClick={handleNavigation}>
                <p>Ver más detalles</p>
            </div>
        </div>

    );
};

export default CardComponent;
