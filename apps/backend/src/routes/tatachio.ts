import express from "express";
import tatachioService from "../services/tatachioService";
import toNewMemberEntry from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(tatachioService.getNonSensitiveEntries());
});

router.post("/", (_req, res) => {
  try {
    const newMemberEntry = toNewMemberEntry(_req.body);
    const addedEntry = tatachioService.addMember(newMemberEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
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
