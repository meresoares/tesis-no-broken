import React from 'react';
import { Link } from 'react-router-dom';
import { format, isValid, parseISO } from 'date-fns';

interface CardProps {
    idPersona: string;
    resultado: string;
    fechaRespuesta: Date | string | null;
    fechaNacimiento: Date | string | null;
}

const CardComponent: React.FC<CardProps> = ({ idPersona, fechaRespuesta, fechaNacimiento, resultado }) => {
    const parseFecha = (fecha: Date | string | null): Date | null => {
        if (!fecha) return null;
        if (typeof fecha === 'string') {
            const parsedDate = parseISO(fecha);
            return isValid(parsedDate) ? parsedDate : null;
        }
        return isValid(fecha) ? fecha : null;
    };

    const formattedFechaRespuesta = parseFecha(fechaRespuesta)
        ? format(parseFecha(fechaRespuesta)!, 'dd/MM/yyyy')
        : 'Fecha inválida';

    const formattedFechaNacimiento = parseFecha(fechaNacimiento)
        ? format(parseFecha(fechaNacimiento)!, 'dd/MM/yyyy')
        : 'Fecha inválida';

    return (
        <Link to={`/persona/${idPersona}`} style={{ textDecoration: 'none' }}>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">ID Persona: {idPersona}</h5>
                    <p>Resultado: {resultado}</p> 
                    <p>Fecha de Respuesta: {formattedFechaRespuesta}</p>
                    <p>Fecha de Nacimiento: {formattedFechaNacimiento}</p>
                </div>
            </div>
        </Link>
    );
};

export default CardComponent;
