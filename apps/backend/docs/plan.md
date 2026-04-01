# Plan de Evolución del Proyecto: Backend SaaS para Tatachio Mirabel

## Objetivos
Desarrollar un backend robusto en formato SaaS para Tatachio Mirabel, facilitando la gestión de datos, análisis basados en LLM y reportes regulatorios oficiales del Ministerio del Interior de Colombia.

## 1. Arquitectura del Backend y Diseño de Base de Datos
- **Stack Tecnológico**: Node.js/TypeScript con Prisma ORM.
- **Base de Datos**: SQLite (Desarrollo/Prototipado) -> PostgreSQL (Producción SaaS).
- **Estrategia de Identificación**: UUID v4 para todos los modelos (Seguridad y sincronización).
- **Diseño del Esquema (Alineado con MinInterior)**:
  - `Usuario`: id, email, password_hash, rol (Administrador/Capitana).
  - `Cabildo`: id, nombre, resguardo, comunidad, vigencia.
  - `Miembro`: id, cabildo_id, campos según formato MinInterior (nombres, documentos, parentesco, novedad, etc.).
  - `Reporte`: id, cabildo_id, tipo (Censo/Altas/Bajas), novedad, generado_en, estado.

## 2. Estrategia de Integración con LLM (Finalizado)
- **Framework**: Vercel AI SDK.
- **Proveedores Dinámicos**: Soporte para Google Gemini (Cloud) y Ollama (Local/Qwen3.5:9b).
- **Resiliencia**: Sistema de Fallback automático entre proveedores.
- **Salida Estructurada**: Uso de `generateObject` y Zod para garantizar JSONs válidos en auditorías.
- **Chat Interactivo**: Capacidad futura de interactuar con los datos vía lenguaje natural (Markdown).

## 3. Servicio de Generación de Reportes Excel (En curso)
- **Requisito**: Cumplimiento estricto de los formatos exigidos por el Ministerio del Interior para Censo, Altas y Bajas.
- **Implementación**: Librería `exceljs` o `xlsx`.
- **Mapeo Automático**: Conversión de datos de Prisma a celdas específicas del formato oficial, incluyendo el campo oficial de `novedad`.

## 4. Normas de Desarrollo (Z Policy)
- **HTTP Client**: NO utilizar `axios`. Usar `fetch` nativo de Node.js (v18+).
- **Convenciones**: Conventional Commits, tipado estricto en TS, y validaciones con Zod.

## 5. Fases de Desarrollo
1.  **Fase 1: Fundamentos (✅ Completado)**: Configuración del proyecto, diseño de BD, inicialización de Prisma.
2.  **Fase 2: API Core y Autenticación (✅ Completado)**: Gestión de usuarios (JWT), roles (Admin/Capitana), CRUD de miembros.
3.  **Fase 3: Integración LLM (✅ Completado)**: Motor de IA dinámico, resiliencia con fallback y auditoría de consistencia.
4.  **Fase 4: Reportes y Chat de IA (🚀 Siguiente)**: Generación de .xlsx oficiales y servicio de chat en Markdown.
5.  **Fase 5: UI Frontend e Integración de Roles**.
