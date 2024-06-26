import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../../components/layout-component';
import { useAuth } from '../../services/auth-service';
import { getPersonDetails } from '../../services/api';

const Detalle: React.FC = () => {
    const { idPersona } = useParams<{ idPersona: string }>();
    const [persona, setPersona] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(true);
    const { user, logout } = useAuth();


    useEffect(() => {
        const fetchPersona = async () => {
            try {
                if (idPersona) {
                    const personaData = await getPersonDetails(idPersona);
                    console.log('Datos de la persona:', personaData); // Añadir log
                    setPersona(personaData);
                } else {
                    console.error('ID de persona no proporcionado');
                }
                setLoading(false);
            } catch (error) {
                console.error('Error al obtener los detalles de la persona:', error);
                setLoading(false);
            }
        };

        fetchPersona();
    }, [idPersona]);

    if (loading) {
        return <p>Cargando...</p>;
    }

    if (!persona) {
        return <p>No se encontraron detalles para esta persona.</p>;
    }



    return (
        <Layout user={user} handleLogout={logout} title='Detalle de Persona' subtitle={`ID Persona: ${idPersona}`}>
            <div className="container">
                <h2>Respuestas del Test</h2>
                <p>Fecha de Nacimiento: {persona.fecha_nacimiento}</p>
                <p>Universidad: {persona.universidad}</p>
                <p>Carrera: {persona.carrera}</p>
                <p>Sexo: {persona.sexo}</p>
                <p>Fecha de evaluacion: {persona.fecha_respuesta}</p>
                <p>Evaluación: {persona.evaluacion}</p>
                <h4>Detalles</h4>
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
