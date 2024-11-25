import express from "express";
import tatachioService from "../services/tatachioService";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(tatachioService.getNonSensitiveEntries());
});

router.post("/", (_req, res) => {
  res.send("saving tatachioDB");
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
