import { atualizarReservaRepository, criarReservaRepository, verificarDisponibilidadeRepository, deletarReservaRepository, listarReservasRepository } from "../repository/reservaRepository.js";
import type { CriarReservaDTO, UpdateReservaDTO } from "../utils/reserva.dto.js";

export const criarReservaService = async (data: CriarReservaDTO) => {
    const disponivel = await verificarDisponibilidadeRepository(data.quartoId, data.checkIn, data.checkOut);

    if (!disponivel) {
        throw new Error("Quarto não esta disponível para reserva nesse período");
    }

    return criarReservaRepository(data);
};

export const atualizarReservarService = async (id: number, data: UpdateReservaDTO) => {
    if (!id || !Number(id)) {
        throw new Error("Erro ao processar id da reserva");
    }

    return atualizarReservaRepository(id, data);
};

export const deletarReservarService = async (id: number) => {
    if (!id || !Number(id)) {
        throw new Error("Erro ao processar id da reserva");
    }

    return deletarReservaRepository(id);
};

//fins de consulta
export const listarReservasService = async () => {
    return await listarReservasRepository();
};
