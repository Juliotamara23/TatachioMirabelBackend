import { Router } from "express";
import { runAnalysis } from "../controllers/analysisController.js";
import { authMiddleware, isAdmin } from "../middleware/authMiddleware.js";

const router = Router();

// El análisis es una tarea crítica de administrador
router.post("/", authMiddleware, isAdmin, runAnalysis);

export default router;
