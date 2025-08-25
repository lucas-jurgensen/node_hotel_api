import type { Request, Response } from "express";
import type { CriarReservaDTO, UpdateReservaDTO } from "../utils/reserva.dto.js";
import { atualizarReservaSchema, criarReservaSchema } from "../schema/reservaSchema.js";
import { atualizarReservarService, criarReservaService, deletarReservarService, listarReservasService } from "../services/reservaService.js";
import { verificarDisponibilidadeRepository } from "../repository/reservaRepository.js";

export const criarReservaController = async (req: Request, res: Response) => {
    try {
        const data: CriarReservaDTO = req.body;
        const dataParsed = criarReservaSchema.parse(data);

        const novaReserva = await criarReservaService(dataParsed);

        res.status(201).json(novaReserva);
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};

export const verificarDisponibilidadeController = async (req: Request, res: Response) => {
    try {
        const data: CriarReservaDTO = req.body;
        const dataParsed = criarReservaSchema.parse(data);

        const disponivel = await verificarDisponibilidadeRepository(dataParsed.quartoId, dataParsed.checkIn, dataParsed.checkOut);

        if (!disponivel) {
            res.status(409).json({ disponivel: false, message: "Quarto indisponível para reserva nesse período" });
            return;
        }

        res.status(200).json({ disponivel: true });
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};

export const atualizarReservaController = async (req: Request, res: Response) => {
    try {
        const data: UpdateReservaDTO = req.body;
        const { id } = req.params;

        if (!id || !Number(id)) {
            res.status(400).json({ message: "O ID é necessário " });
        }

        const dataParsed = atualizarReservaSchema.parse(data);

        const reservaAtualizada = await atualizarReservarService(Number(id), data);

        res.status(200).json(reservaAtualizada);
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};

export const deletarReservaController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        if (!id || !Number(id)) {
            res.status(400).json({ message: "O ID é necessário " });
            return;
        }

        await deletarReservarService(Number(id));

        res.status(204).send();
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};

//fins de consulta
export const listarReservaController = async (req: Request, res: Response) => {
    try {
        const ok = await listarReservasService();

        if (!ok) {
            res.status(400).json({ message: "nenhuma reserva" });
        }

        res.status(200).json(ok);
    } catch (err: any) {
        res.status(400).json({ message: err.message });
    }
};
