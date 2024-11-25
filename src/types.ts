export type TipoDocumento = 'CC' | 'RC' | 'NUIP' | 'TI';
export type Parentesco = 'PA' | 'MA' | 'CO' | 'HE' | 'CF' | 'ES' | 'HI' | 'YR' | 'NU' | 'SU' | 'SO' | 'CU' | 'TI' | 'AB' | 'PR' | 'NI';
export type Sexo = 'M' | 'F';
export type EstadoCivil = 'C' | 'S' | 'V';
export type Escolaridad = 'PR' | 'SE' | 'UN' | 'NI';

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

export type NonSensitiveMemberEntry = Omit<MemberEntry, 'TELEFONO'>;
export type NewMemberEntry = Omit<MemberEntry, 'NUMERO_DOCUMENTO'>;