import express from "express";
import tatachioService from "../services/tatachioService";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(tatachioService.getNonSensitiveEntries());
});

router.post("/", (_req, res) => {
  const { RESGUARDO_INDIGENA, COMUNIDAD_INDIGENA, FAMILIA, TIPO_IDENTIFICACION, NOMBRE, APELLIDOS, FECHA_NACIMIENTO, PARENTESCO, SEXO, ESTADO_CIVIL, PROFESION, ESCOLARIDAD, INTEGRANTES, DIRECCION, TELEFONO, USUARIO } = _req.body;
  const addedEntry = tatachioService.addEntry({
    RESGUARDO_INDIGENA,
    COMUNIDAD_INDIGENA,
    FAMILIA,
    TIPO_IDENTIFICACION,
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
    TELEFONO,
    USUARIO,
  });
  res.json(addedEntry);
});

router.get("/:id", (req, res) => {
  const member = tatachioService.findbyId(Number(req.params.id));
  if (!member) {
    res.status(404).send("Member not found");
    return;
  }
  res.send(member);
});

export default router;
