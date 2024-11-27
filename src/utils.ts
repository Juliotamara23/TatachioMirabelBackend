import { NewMemberEntry } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isNumber = (number: unknown): number is number => {
  return typeof number === "number" || number instanceof Number;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseComunidad = (COMUNIDAD_INDIGENA: unknown): string => {
  if (!COMUNIDAD_INDIGENA || !isString(COMUNIDAD_INDIGENA)) {
    throw new Error("Incorrect o missing COMUNIDAD_INDIGENA");
  }
  return COMUNIDAD_INDIGENA;
};

const ParseFechaNacimiento = (FECHA_NACIMIENTO: unknown): string => {
  if (
    !FECHA_NACIMIENTO ||
    !isString(FECHA_NACIMIENTO) ||
    !isDate(FECHA_NACIMIENTO)
  ) {
    throw new Error("Incorrect o missing FECHA_NACIMIENTO" + FECHA_NACIMIENTO);
  }
  return FECHA_NACIMIENTO;
};

const ParseTelefono = (TELEFONO: unknown): number => {
    if (!TELEFONO || !isNumber(TELEFONO)) {
      throw new Error("Incorrect o missing TELEFONO");
    }
    return TELEFONO;
};

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
      TELEFONO: 0,
      USUARIO: "",
    };
    return newEntry;
  };

export default toNewMemberEntry;
