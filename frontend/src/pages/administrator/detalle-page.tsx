import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../../components/layout-component';
import { useAuth } from '../../services/auth-service';
import { getPersonDetails } from '../../services/api';

const Detalle: React.FC = () => {
    const { idPersona } = useParams<{ idPersona: string }>();
    const [persona, setPersona] = useState<any>({});
    const { user, logout } = useAuth();


    useEffect(() => {
        const fetchPersonDetails = async () => {
            if (!idPersona) {
                console.error('ID de persona no proporcionado.');
                return;
            }
            try {
                const personaData = await getPersonDetails(idPersona);
                setPersona(personaData);
            } catch (error) {
                console.error(`Error al obtener detalles de la persona ${idPersona}:`, error);
                setPersona({});
            }
        };

        fetchPersonDetails();
    }, [idPersona]);

    if (!idPersona) {
        return <p>Selecciona una persona para ver los detalles.</p>;
    }


    return (
        <Layout user={user} handleLogout={logout} title='Detalle de Persona' subtitle={`ID Persona: ${idPersona}`}>
            <div className="container">
                <h2>Detalles de Persona</h2>
                <p>ID Persona: {persona.id_persona}</p>
                <p>Fecha de Nacimiento: {persona.fecha_nacimiento}</p>
                <p>Universidad: {persona.universidad}</p>
                <p>Carrera: {persona.carrera}</p>
                <p>Sexo: {persona.sexo}</p>
                <p>Evaluación: {persona.evaluacion}</p>
                <p>Fecha de Respuesta: {persona.fecha_respuesta}</p>
                <h3>Respuestas</h3>
                {persona.respuestas && persona.respuestas.length > 0  ? (
                    <ul>
                        {persona.respuestas.map((respuesta: any, index: number) => (
                            <li key={index}>
                                <p>ID Pregunta: {respuesta.id_pregunta}</p>
                                <p>Texto de Pregunta: {respuesta.texto_pregunta}</p>
                                <p>Respuesta: {respuesta.texto_respuesta}</p>
                                <hr />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No hay respuestas registradas para esta persona.</p>
                )}
            </div>
        </Layout>
    );
};

export default Detalle;
