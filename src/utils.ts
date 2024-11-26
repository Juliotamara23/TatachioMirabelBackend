import { NewMemberEntry } from "./types";

// datos falsos para evitar errores molestos
const toNewMemberEntry = (object: unknown): NewMemberEntry => {
    const newEntry: NewMemberEntry = {
        RESGUARDO_INDIGENA: 0,
        COMUNIDAD_INDIGENA: "",
        FAMILIA: 0,
        TIPO_IDENTIFICACION: "CC",
        NOMBRE: "",
        APELLIDOS: "",
        FECHA_NACIMIENTO: "",
        PARENTESCO: "TI",
        SEXO: "M",
        ESTADO_CIVIL: "S",
        PROFESION: "",
        ESCOLARIDAD: "PR",
        INTEGRANTES: 0,
        DIRECCION: "",
        USUARIO: ""
    }
    return newEntry;
};

export default toNewMemberEntry;