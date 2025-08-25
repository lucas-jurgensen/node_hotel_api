import express from "express";
import { atualizarReservaController, criarReservaController, deletarReservaController, listarReservaController } from "../controllers/reservationControllers.js";

const router = express.Router();

router.get("/", listarReservaController);

router.post("/", criarReservaController);

router.put("/:id", atualizarReservaController);

router.delete("/:id", deletarReservaController);

export default router;
