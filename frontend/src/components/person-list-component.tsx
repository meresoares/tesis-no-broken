import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout-component';
import { getAllPersons } from '../services/api'; // Asumiendo que tienes un servicio para obtener todos los IDs de personas

const ListadoPersonasComponent: React.FC = () => {
    const [personas, setPersonas] = useState<string[]>([]); // Aquí almacenamos solo los IDs de personas

    useEffect(() => {
        const fetchPersonIds = async () => {
            try {
                const personasData = await getAllPersons(); // Obtener todos los IDs de personas desde el servicio
                setPersonas(personasData);
            } catch (error) {
                console.error('Error al obtener los IDs de personas:', error);
                setPersonas([]);
            }
        };

        fetchPersonIds();
    }, []);

    return (
        <Layout user={null} handleLogout={() => {}} title='Listado de Personas' subtitle='Todas las personas registradas'>
            <div className="container">
                <h2>Listado de Personas</h2>
                {personas.length === 0 ? (
                    <p>No hay personas registradas.</p>
                ) : (
                    <ul>
                        {personas.map((personaId, index) => (
                            <li key={index}>
                                <Link to={`/detalle/${personaId}`}>
                                    <div className="card">
                                        <h3>ID Persona: {personaId}</h3>
                                        <p>Click para ver detalles</p>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </Layout>
    );
};

export default ListadoPersonasComponent;
