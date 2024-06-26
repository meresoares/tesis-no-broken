import React, { useEffect, useState } from 'react';
import { getAllRespuestas } from '../../services/api';
import Layout from '../../components/layout-component';
import axios from 'axios';
import { useAuth } from '../../services/auth-service';
import CardComponent from '../../components/card-component';

interface Respuesta {
    id_persona: string;
    resultado: string;
    fecha_respuesta: string | null;
    fecha_nacimiento: string | null;
}


const HomeAdmin: React.FC = () => {
    const [respuestas, setRespuestas] = useState<Respuesta[]>([]);
    const { user, logout } = useAuth();
    const API_BASE_URL = 'http://localhost:3001/api';


    useEffect(() => {
        const fetchRespuestas = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/test/${user?.uid}`);
                const respuestasData = response.data;
                console.log('Datos de la API:', respuestasData);

                // Mapear y convertir fechas
                const respuestasConFechas = respuestasData.map((respuesta: any) => ({
                    id_persona: respuesta.id_persona,
                    resultado: respuesta.resultado,
                    fecha_nacimiento: respuesta.fecha_nacimiento ? new Date(respuesta.fecha_nacimiento) : null,
                    fecha_respuesta: respuesta.fecha_respuesta ? new Date(respuesta.fecha_respuesta) : null,
                }));
                console.log('Datos con fechas convertidas:', respuestasConFechas);

                const respuestasUnicas = Object.values(respuestasConFechas.reduce((acc: Record<string, Respuesta>, respuesta: Respuesta) => {
                    if (!acc[respuesta.id_persona]) {
                        acc[respuesta.id_persona] = respuesta;
                    }
                    return acc;
                }, {}));

                setRespuestas(respuestasUnicas as Respuesta[]);
            } catch (error) {
                console.error('Error al obtener las respuestas:', error);
                setRespuestas([]);
            }
        };

        fetchRespuestas();
    }, [user?.uid]);

    return (
        <Layout user={user} handleLogout={logout} title='Bienvenido a AnxieSense' subtitle='Tests Realizados'>
            <div className="container">
                <h2>Tests Realizados</h2>
                {respuestas.length === 0 ? (
                    <p>No hay respuestas disponibles.</p>
                ) : (
                    <div className="row">
                        {respuestas.map((respuesta, index) => (
                            <div key={index} className="col-md-4 mb-3">
                                <CardComponent
                                    idPersona={respuesta.id_persona}
                                    resultado={respuesta.resultado}
                                    fechaRespuesta={respuesta.fecha_respuesta}
                                    fechaNacimiento={respuesta.fecha_nacimiento}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default HomeAdmin;
