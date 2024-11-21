import express from "express";
import tatachioService from "../services/tatachioService";

const router = express.Router();

router.get('/', (_req, res) =>{
    res.send(tatachioService.getNonSensitiveEntries());
});

router.post('/', (_req, res) => {
    res.send('saving tatachioDB');
})

export default router;