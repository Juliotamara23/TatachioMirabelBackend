import {
  NewMemberEntry,
  TipoDocumento,
  Parentesco,
  Sexo,
  EstadoCivil,
  Escolaridad,
} from "./types";

// Validacion de tipos
const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isNumber = (number: unknown): number is number => {
  return typeof number === "number" || number instanceof Number;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isTipoDocumento = (params: string): params is TipoDocumento => {
  return Object.values(TipoDocumento)
    .map((v) => v.toString())
    .includes(params);
};

const isParentesco = (params: string): params is Parentesco => {
  return Object.values(Parentesco)
    .map((v) => v.toString())
    .includes(params);
};

const isSexo = (params: string): params is Sexo => {
  return Object.values(Sexo)
    .map((v) => v.toString())
    .includes(params);
};

const isEstadoCivil = (params: string): params is EstadoCivil => {
  return Object.values(EstadoCivil)
    .map((v) => v.toString())
    .includes(params);
};

const isEscolaridad = (params: string): params is Escolaridad => {
  return Object.values(Escolaridad)
    .map((v) => v.toString())
    .includes(params);
};

// parseo de datos

const parseResguardo = (RESGUARDO_INDIGENA: unknown): number => {
  if (!RESGUARDO_INDIGENA || !isNumber(RESGUARDO_INDIGENA)) {
    throw new Error("Incorrect o missing RESGUARDO_INDIGENA");
  }
  return RESGUARDO_INDIGENA;
};

const parseComunidad = (COMUNIDAD_INDIGENA: unknown): string => {
  if (!COMUNIDAD_INDIGENA || !isString(COMUNIDAD_INDIGENA)) {
    throw new Error("Incorrect o missing COMUNIDAD_INDIGENA");
  }
  return COMUNIDAD_INDIGENA;
};

const parseFamilia = (FAMILIA: unknown): number => {
  if (!FAMILIA || !isNumber(FAMILIA)) {
    throw new Error("Incorrect o missing FAMILIA");
  }
  return FAMILIA;
};

const parseTipoDocumento = (TIPO_IDENTIFICACION: unknown): TipoDocumento => {
  if (
    !TIPO_IDENTIFICACION ||
    !isString(TIPO_IDENTIFICACION) ||
    !isTipoDocumento(TIPO_IDENTIFICACION)
  ) {
    throw new Error("Incorrect o missing TIPO_IDENTIFICACION");
  }
  return TIPO_IDENTIFICACION;
};

const parseNumeroDocumento = (NUMERO_DOCUMENTO: unknown): number => {
  if (!NUMERO_DOCUMENTO || !isNumber(NUMERO_DOCUMENTO)) {
    throw new Error("Incorrect o missing NUMERO_DOCUMENTO");
  }
  return NUMERO_DOCUMENTO;
};

const parseNombre = (NOMBRE: unknown): string => {
  if (!NOMBRE || !isString(NOMBRE)) {
    throw new Error("Incorrect o missing NOMBRE");
  }
  return NOMBRE;
};

const parseApellidos = (APELLIDOS: unknown): string => {
  if (!APELLIDOS || !isString(APELLIDOS)) {
    throw new Error("Incorrect o missing APELLIDOS");
  }
  return APELLIDOS;
};

const parseFechaNacimiento = (FECHA_NACIMIENTO: unknown): string => {
  if (
    !FECHA_NACIMIENTO ||
    !isString(FECHA_NACIMIENTO) ||
    !isDate(FECHA_NACIMIENTO)
  ) {
    throw new Error("Incorrect o missing FECHA_NACIMIENTO" + FECHA_NACIMIENTO);
  }
  return FECHA_NACIMIENTO;
};

const parseParentesco = (PARENTESCO: unknown): Parentesco => {
  if (!PARENTESCO || !isString(PARENTESCO) || !isParentesco(PARENTESCO)) {
    throw new Error("Incorrect o missing PARENTESCO");
  }
  return PARENTESCO;
};

const parseSexo = (SEXO: unknown): Sexo => {
  if (!SEXO || !isString(SEXO) || !isSexo(SEXO)) {
    throw new Error("Incorrect o missing SEXO");
  }
  return SEXO;
};

const parseEstadoCivil = (ESTADO_CIVIL: unknown): EstadoCivil => {
  if (
    !ESTADO_CIVIL ||
    !isString(ESTADO_CIVIL) ||
    !isEstadoCivil(ESTADO_CIVIL)
  ) {
    throw new Error("Incorrect o missing ESTADO_CIVIL");
  }
  return ESTADO_CIVIL;
};

const parseProfesion = (PROFESION: unknown): string => {
  if (!PROFESION || !isString(PROFESION)) {
    throw new Error("Incorrect o missing PROFESION");
  }
  return PROFESION;
};

const parseEscolaridad = (ESCOLARIDAD: unknown): Escolaridad => {
  if (!ESCOLARIDAD || !isString(ESCOLARIDAD) || !isEscolaridad(ESCOLARIDAD)) {
    throw new Error("Incorrect o missing ESCOLARIDAD");
  }
  return ESCOLARIDAD;
};

const parseIntegrantes = (INTEGRANTES: unknown): number => {
  if (!INTEGRANTES || !isNumber(INTEGRANTES)) {
    throw new Error("Incorrect o missing INTEGRANTES");
  }
  return INTEGRANTES;
};

const parseDireccion = (DIRECCION: unknown): string => {
  if (!DIRECCION || !isString(DIRECCION)) {
    throw new Error("Incorrect o missing DIRECCION");
  }
  return DIRECCION;
};

const parseTelefono = (TELEFONO: unknown): number => {
  if (!TELEFONO || !isNumber(TELEFONO)) {
    throw new Error("Incorrect o missing TELEFONO");
  }
  return TELEFONO;
};

const parseUsuario = (USUARIO: unknown): string => {
  if (!USUARIO || !isString(USUARIO)) {
    throw new Error("Incorrect o missing USUARIO")
  }
  return USUARIO
};

const toNewMemberEntry = (object: unknown): NewMemberEntry => {
    if (!object || typeof object !== "object") {
        throw new Error("Incorrect o missing data");
    }

    if ('RESGUARDO_INDIGENA' in object && 'COMUNIDAD_INDIGENA' in object && 'FAMILIA' in object && 'TIPO_IDENTIFICACION' in object && 'NUMERO_DOCUMENTO' in object && 'NOMBRE' in object && 'APELLIDOS' in object && 'FECHA_NACIMIENTO' in object && 'PARENTESCO' in object && 'SEXO' in object && 'ESTADO_CIVIL' in object && 'PROFESION' in object && 'ESCOLARIDAD' in object && 'INTEGRANTES' in object && 'DIRECCION' in object && 'TELEFONO' in object && 'USUARIO' in object) {
        const newEntry: NewMemberEntry = {
            RESGUARDO_INDIGENA: parseResguardo(object.RESGUARDO_INDIGENA),
            COMUNIDAD_INDIGENA: parseComunidad(object.COMUNIDAD_INDIGENA),
            FAMILIA: parseFamilia(object.FAMILIA),
            TIPO_IDENTIFICACION: parseTipoDocumento(object.TIPO_IDENTIFICACION),
            NUMERO_DOCUMENTO: parseNumeroDocumento(object.NUMERO_DOCUMENTO),
            NOMBRE: parseNombre(object.NOMBRE),
            APELLIDOS: parseApellidos(object.APELLIDOS),
            FECHA_NACIMIENTO: parseFechaNacimiento(object.FECHA_NACIMIENTO),
            PARENTESCO: parseParentesco(object.PARENTESCO),
            SEXO: parseSexo(object.SEXO),
            ESTADO_CIVIL: parseEstadoCivil(object.ESTADO_CIVIL),
            PROFESION: parseProfesion(object.PROFESION),
            ESCOLARIDAD: parseEscolaridad(object.ESCOLARIDAD),
            INTEGRANTES: parseIntegrantes(object.INTEGRANTES),
            DIRECCION: parseDireccion(object.DIRECCION),
            TELEFONO: parseTelefono(object.TELEFONO),
            USUARIO: parseUsuario(object.USUARIO)
        }
        return newEntry;
    }
    throw new Error("Incorrect data: Some fields are missing");
};
export default toNewMemberEntry;
