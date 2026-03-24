# Plan de Evolución del Proyecto: Backend SaaS para Tatachio Mirabel

## Objetivos
Desarrollar un backend robusto en formato SaaS para Tatachio Mirabel, facilitando la gestión de datos, análisis basados en LLM y reportes regulatorios.

## 1. Arquitectura del Backend y Diseño de Base de Datos
- **Stack Tecnológico**: Node.js/TypeScript con Prisma ORM (seleccionado por seguridad de tipos y facilidad de migración).
- **Base de Datos**: PostgreSQL (Estructura relacional para consistencia de datos).
- **Diseño del Esquema**:
  - `Usuario`: id, email, password_hash, rol (Administrador/Capitana).
  - `Cabildo`: id, nombre, ubicación, metadatos.
  - `DatosCensales`: id, cabildo_id, campos según formato MinInterior (nombres, documentos, fechas, etc.).
  - `Reporte`: id, cabildo_id, tipo (Censo/Altas/Bajas), generado_en, estado.

## 2. Estrategia de Integración con LLM
- **Framework**: Vercel AI SDK (o LangChain).
- **Soporte**:
  - Ollama (Local/Self-hosted para privacidad/costo-eficiencia).
  - Google Gemini API (Nube para tareas de alto rendimiento).
- **Estrategia**: Servicio de enrutamiento para decidir entre modelos según la complejidad de la tarea y la sensibilidad de los datos.

## 3. Servicio de Generación de Reportes Excel
- **Requisito**: Seguir los formatos exigidos por el Ministerio del Interior para Censo, Altas y Bajas.
- **Implementación**: Librería `exceljs` o `xlsx`.
- **Flujo**:
  1. Obtener datos filtrados de la BD.
  2. Mapear a la estructura de la plantilla del Ministerio del Interior.
  3. Generar y enviar `.xlsx` al cliente.

## 4. Vistas de Frontend basadas en Roles
- **Roles**:
  - **Administrador**: Acceso total, gestión de usuarios, configuración avanzada y herramientas de análisis/limpieza.
  - **Capitana**: Entrada de datos, visualización de reportes y gestión operativa específica del cabildo.
- **Control de Acceso**: Autenticación basada en JWT con middleware de autorización por roles.

## 5. Fases de Desarrollo
1. **Fase 1: Fundamentos**: Configuración del proyecto, diseño del esquema de BD, inicialización de Prisma.
2. **Fase 2: API Core y Autenticación**: Gestión de usuarios, endpoints CRUD básicos.
3. **Fase 3: Integración LLM**: Configuración de servicios de Ollama/Gemini.
4. **Fase 4: Reportes**: Desarrollo del servicio de generación de reportes Excel.
5. **Fase 5: UI Frontend e Integración de Roles**.
