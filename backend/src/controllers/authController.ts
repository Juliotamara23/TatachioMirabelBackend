import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import prisma from "../database";

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, nombre } = req.body;

    // 1. Validar si el usuario ya existe
    const usuarioExistente = await prisma.usuario.findUnique({
      where: { email },
    });

    if (usuarioExistente) {
      return res.status(400).json({ error: "El correo ya está registrado" });
    }

    // 2. Hash de la contraseña
    const passwordHash = await bcrypt.hash(password, 10);

    // 3. Crear el usuario
    const nuevoUsuario = await prisma.usuario.create({
      data: {
        email,
        passwordHash,
        nombre,
      },
    });

    // 4. Retornar respuesta sin la contraseña
    const { passwordHash: _, ...usuarioSinPassword } = nuevoUsuario;
    res.status(201).json(usuarioSinPassword);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al registrar usuario" });
  }
};
