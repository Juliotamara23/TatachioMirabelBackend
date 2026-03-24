export enum TipoDocumento {
  CC = "CC",
  RC = "RC",
  NUIP = "NUIP",
  TI = "TI",
}

export enum Parentesco {
  PA = "PA",
  MA = "MA",
  CO = "CO",
  HE = "HE",
  CF = "CF",
  ES = "ES",
  HI = "HI",
  YR = "YR",
  NU = "NU",
  SU = "SU",
  SO = "SO",
  CU = "CU",
  TI = "TI",
  AB = "AB",
  PR = "PR",
  NI = "NI",
}

export enum Sexo {
  M = "M",
  F = "F",
}

export enum EstadoCivil {
  C = "C",
  S = "S",
  V = "V",
}

export enum Escolaridad {
  PR = "PR",
  SE = "SE",
  UN = "UN",
  NI = "NI",
}

export interface MemberEntry {
  RESGUARDO_INDIGENA: number;
  COMUNIDAD_INDIGENA: string;
  FAMILIA: number;
  TIPO_IDENTIFICACION: TipoDocumento;
  NUMERO_DOCUMENTO: number;
  NOMBRE: string;
  APELLIDOS: string;
  FECHA_NACIMIENTO: string;
  PARENTESCO: Parentesco;
  SEXO: Sexo;
  ESTADO_CIVIL: EstadoCivil;
  PROFESION: string;
  ESCOLARIDAD: Escolaridad;
  INTEGRANTES: number;
  DIRECCION: string;
  TELEFONO?: number;
  USUARIO: string;
}

export type NonSensitiveMemberEntry = Omit<MemberEntry, "TELEFONO">;
export type NewMemberEntry = Omit<MemberEntry, "NUMERO_DOCUMENTO">;
