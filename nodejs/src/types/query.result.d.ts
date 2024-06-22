export interface QueryResultRow {
    id_persona: string;
    fecha_nacimiento: Date;
    universidad: string;
    carrera: string;
    sexo: string;
    id_pregunta: number;
    texto_pregunta: string;
    texto_respuesta: string;
    evaluacion: string;
    fecha_respuesta: Date;
}

export type QueryResult = {
    rows: QueryResultRow[];
};
