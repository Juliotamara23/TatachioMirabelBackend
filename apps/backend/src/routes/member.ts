import { Router } from "express";
import {
  createMember,
  getMembers,
  getMemberById,
  updateMember,
  deleteMember,
} from "../controllers/memberController.js";
import { authMiddleware, isAdmin } from "../middleware/authMiddleware.js";

const router = Router();

// Todas las rutas de miembros requieren autenticación y rol de administrador por ahora
router.use(authMiddleware);
router.use(isAdmin);

router.post("/", createMember);
router.get("/", getMembers);
router.get("/:id", getMemberById);
router.put("/:id", updateMember);
router.delete("/:id", deleteMember);

export default router;
