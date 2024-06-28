import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Layout from '../../components/layout-component';
import { useAuth } from '../../services/auth-service';
import axios from 'axios';

interface PreguntaRespuesta {
    id_pregunta: string;
    texto_pregunta: string;
    texto_respuesta: string;
}

interface PersonaDetalle {
    id_persona: string;
    fecha_nacimiento: string;
    universidad: string;
    carrera: string;
    sexo: string;
    evaluacion: string;
    fecha_respuesta: string;
    preguntas_respuestas: PreguntaRespuesta[];
}

const DetalleAdmin: React.FC = () => {
    const { idPersona } = useParams<{ idPersona: string }>();
    const [detalles, setDetalles] = useState<PersonaDetalle | null>(null);    
    const [loading, setLoading] = useState<boolean>(true);
    const { user, logout } = useAuth();
    const location = useLocation();
    const API_BASE_URL = 'http://localhost:3001/api';

    useEffect(() => {
        console.log('ID de Persona desde useParams:', idPersona);  // Verifica que el ID se esté obteniendo correctamente
        const fetchDetalles = async () => {
            try {
                if (idPersona) {
                    const response = await axios.get(`${API_BASE_URL}/detalle/${idPersona}`);         
                    const personaData = response.data[0]; // Acceder al primer (y único) elemento del array           
                    console.log('Datos de la persona:', personaData);
                    setDetalles(response.data);
                    setLoading(false);
                } else {
                    console.error('ID de persona no proporcionado');
                }
                setLoading(false);
            } catch (error) {
                console.error('Error al obtener los detalles de la persona:', error);
                setLoading(false);
            }
        };

        fetchDetalles();
    }, [idPersona]);

    if (loading) {
        return <p>Cargando datos...</p>;
    }

    if (!detalles) {
        return <div>No se encontraron datos de la persona.</div>;
    }

     // Verificar los datos que llegan desde el estado de la navegación
     console.log('location state:', location.state);

    return (
        <Layout 
            user={user} 
            handleLogout={logout} 
            title='Tests Realizados' 
            subtitle=''
            titleClassName="vlad_result_title">
        <div className="container">
        <div className="vlad_card">
                    <p className='mere_p'>Fecha de Nacimiento</p>
                    <p className='vlad_p'>{new Date(detalles.fecha_nacimiento).toLocaleDateString()}</p>
                </div>
                <div className="card">
                    <p className='mere_p'>Fecha de Evaluación</p>
                    <p className='vlad_p'>{new Date(detalles.fecha_respuesta).toLocaleDateString()}</p>
                </div>
                <div className="card">
                    <p className='mere_p'>Sexo</p>
                    <p className='vlad_p'>{detalles.sexo}</p>
                </div>
                <div className="card">
                    <p className='mere_p'>Facultad</p>
                    <p className='vlad_p'>{detalles.universidad}</p>
                </div>
                <div className="card">
                    <p className='mere_p'>Carrera</p>
                    <p className='vlad_p'>{detalles.carrera}</p>
                </div>
           
            <div className="detalles">
                <table>
                    <thead>
                        <tr className='vlad_p'>
                            <th>Número</th>
                            <th>Preguntas</th>
                            <th>Respuestas</th>
                        </tr>
                    </thead>
                    <tbody className='mere_p'>
                        {detalles.preguntas_respuestas.map((pr, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{pr.texto_pregunta}</td>
                                <td className='vlad_respuestas'>{pr.texto_respuesta || 'Nada'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </Layout>
    );
};

export default DetalleAdmin;
