import React, { useEffect, useState } from 'react';
import { getAllRespuestas } from '../../services/api';
import Layout from '../../components/layout-component';
import { useAuth } from '../../services/auth-service';
import CardComponent from '../../components/card-component';
import { format } from 'date-fns';


interface Respuesta {
    id_persona: string;
    fecha_respuesta: string | null;
    fecha_nacimiento: string | null;
}


const HomeAdmin: React.FC = () => {
    const [respuestas, setRespuestas] = useState<Respuesta[]>([]);   
    const { user, logout } = useAuth();

    
    useEffect(() => {
        const fetchRespuestas = async () => {
            try {
                const respuestasData = await getAllRespuestas();
                console.log('Datos de la API:', respuestasData);

                const respuestasConFechas = respuestasData.map((respuesta: any) => ({
                    id_persona: respuesta.id_persona,
                    fecha_nacimiento: respuesta.fecha_nacimiento ? new Date(respuesta.fecha_nacimiento) : null,
                    fecha_respuesta: respuesta.fecha_respuesta ? new Date(respuesta.fecha_respuesta) : null,
                }));
                console.log('Datos con fechas convertidas:', respuestasConFechas);

                setRespuestas(respuestasConFechas);
            } catch (error) {
                console.error('Error al obtener las respuestas:', error);
                setRespuestas([]);
            }
        };

        fetchRespuestas();
    }, []); 

    return (
        <Layout user={user} handleLogout={logout} title='Bienvenido a AnxieSense' subtitle='Respuestas'>
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
