import { Request, Response } from "express";
import { analyzeConsistency } from "../services/aiService.js";
import prisma from "../database.js";

/**
 * Endpoint para disparar el análisis de IA sobre los miembros del cabildo
 */
export const runAnalysis = async (req: Request, res: Response) => {
  try {
    const { preferredProvider } = req.body;

    // 1. Obtener los miembros activos para analizar
    const miembros = await prisma.miembro.findMany({
      take: 50, // Limitamos para no exceder tokens en la prueba inicial
      select: {
        id: true,
        numeroDocumento: true,
        nombres: true,
        apellidos: true,
        fechaNacimiento: true,
        parentesco: true,
        sexo: true,
        integrantes: true,
      },
    });

    if (miembros.length === 0) {
      return res.status(404).json({ error: "No hay miembros para analizar" });
    }

    // 2. Ejecutar el análisis con el motor de resiliencia (Gemini -> Ollama)
    const resultadoIA = await analyzeConsistency(miembros, preferredProvider);

    // 3. Devolver el resultado incluyendo la metadata del modelo usado
    res.json({
      success: true,
      data: resultadoIA,
    });
  } catch (error) {
    console.error("Error en el análisis de IA:", error);
    res.status(500).json({ error: "No se pudo completar el análisis de IA" });
  }
};
