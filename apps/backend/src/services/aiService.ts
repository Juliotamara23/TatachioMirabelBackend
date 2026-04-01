import { google } from "@ai-sdk/google";
import { createOllama } from "ollama-ai-provider";
import { generateObject, LanguageModel, generateText } from "ai";
import { z } from "zod";

const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL || "http://localhost:11434/api";

const ollamaProvider = createOllama({
  baseURL: OLLAMA_BASE_URL,
});

const MODELS = {
  GEMINI: "gemini-3.1-flash-lite-preview",
  QWEN: "qwen3.5:9b",
};

interface Provider {
  model: LanguageModel;
  name: string;
  type: 'google' | 'ollama';
}

const analysisSchema = z.object({
  inconsistencias: z.array(z.object({
    tipo: z.string(),
    gravedad: z.string(),
    descripcion: z.string(),
    miembrosInvolucrados: z.array(z.string()),
    accionSugerida: z.string()
  }))
});

/**
 * Realiza el análisis de consistencia sobre una lista de miembros.
 * @param membersData Datos de los miembros a analizar.
 * @param preferredProvider Proveedor opcional ('google' o 'ollama').
 */
export const analyzeConsistency = async (membersData: any[], preferredProvider?: 'google' | 'ollama') => {
  const allProviders: Provider[] = [
    { model: google(MODELS.GEMINI) as any, name: MODELS.GEMINI, type: 'google' },
    { model: ollamaProvider(MODELS.QWEN) as any, name: MODELS.QWEN, type: 'ollama' },
  ];

  // Si hay un preferido, SOLAMENTE intentamos ese para el test de proveedor específico.
  // El fallback automático solo ocurre si no se especifica preferencia.
  let providersToTry = [...allProviders];
  if (preferredProvider) {
    const selected = allProviders.find(p => p.type === preferredProvider);
    if (selected) {
      providersToTry = [selected];
    }
  }

  const prompt = `
    Eres un experto en auditoría de datos censales. Analiza: ${JSON.stringify(membersData)}.
    Detecta duplicados, inconsistencias y errores.
    Responde estrictamente en formato JSON con una lista de inconsistencias.
  `;

  for (const provider of providersToTry) {
    try {
      console.log(`Intentando análisis con: ${provider.name} (${provider.type})`);
      
      let result;
      // Los modelos de Ollama a veces requieren fallback a generateText si no soportan v2
      if (provider.type === 'ollama') {
        const { text } = await generateText({
          model: provider.model,
          prompt: `${prompt}\nIMPORTANTE: Responde ÚNICAMENTE con el objeto JSON solicitado, sin bloques de código ni texto adicional.`,
        }).catch(err => {
          // Si el error es de autenticación o falta de API KEY, saltamos al siguiente
          if (err.message.includes("API key is missing")) {
            throw err;
          }
          throw err;
        });
        
        const cleanText = text.replace(/```json/g, "").replace(/```/g, "").trim();
        result = JSON.parse(cleanText);
      } else {
        const { object } = await generateObject({
          model: provider.model,
          schema: analysisSchema,
          prompt,
        });
        result = object;
      }

      return {
        ...result,
        metadata: {
          modeloUtilizado: provider.name,
          proveedor: provider.type === 'google' ? "Google" : "Ollama"
        }
      };
    } catch (error) {
      console.error(`Error con proveedor ${provider.type} (${provider.name}):`, error);
      continue; 
    }
  }

  throw new Error("No se pudo completar el análisis con ningún proveedor de IA.");
};
