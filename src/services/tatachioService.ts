import tatachioData from "../../data/members";
import { MemberEntry, NonSensitiveMemberEntry } from "../types";
const members: MemberEntry[] = tatachioData as MemberEntry[];

const getEntries = (): MemberEntry[] => {
    return members;
}

const getNonSensitiveEntries = (): NonSensitiveMemberEntry[] => {
    return members.map(({ RESGUARDO_INDIGENA, COMUNIDAD_INDIGENA, FAMILIA, TIPO_IDENTIFICACION, NUMERO_DOCUMENTO, NOMBRE, APELLIDOS, FECHA_NACIMIENTO, PARENTESCO, SEXO, ESTADO_CIVIL, PROFESION, ESCOLARIDAD, INTEGRANTES, DIRECCION, USUARIO }) => ({
        RESGUARDO_INDIGENA,
        COMUNIDAD_INDIGENA,
        FAMILIA,
        TIPO_IDENTIFICACION,
        NUMERO_DOCUMENTO,
        NOMBRE,
        APELLIDOS,
        FECHA_NACIMIENTO,
        PARENTESCO,
        SEXO,
        ESTADO_CIVIL,
        PROFESION,
        ESCOLARIDAD,
        INTEGRANTES,
        DIRECCION,
        USUARIO
    }));
}

const addEntry = () => {
    return null;
}

export default {
    getEntries,
    addEntry,
    getNonSensitiveEntries
}