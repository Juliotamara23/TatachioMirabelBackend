import tatachioData from "../../data/members";
import { MemberEntry, NonSensitiveMemberEntry, NewMemberEntry } from "../types";
const members: MemberEntry[] = tatachioData as MemberEntry[];

const getEntries = (): MemberEntry[] => {
  return members;
};

const getNonSensitiveEntries = (): NonSensitiveMemberEntry[] => {
  return members.map(
    ({
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
      USUARIO,
    }) => ({
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
      USUARIO,
    })
  );
};

const findbyId = (id: number): MemberEntry | undefined => {
  const entry = members.find((member) => member.NUMERO_DOCUMENTO === id);
  return entry;
};

const addMember = (entry: NewMemberEntry): MemberEntry => {
  const newMemberEntry = {
    NUMERO_DOCUMENTO:
      Math.max(...members.map((member) => member.NUMERO_DOCUMENTO)) + 1,
    ...entry,
  };

  members.push(newMemberEntry);
  return newMemberEntry;
};

export default {
  getEntries,
  addMember,
  getNonSensitiveEntries,
  findbyId,
};
