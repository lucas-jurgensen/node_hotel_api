import { prisma } from "../utils/prisma.js";
import type { CriarReservaDTO, UpdateReservaDTO } from "../utils/reserva.dto.js";

export const criarReservaRepository = async (data: CriarReservaDTO) => {
    return await prisma.reserva.create({
        data,
    });
};

export const verificarDisponibilidadeRepository = async (quartoId: number, checkIn: Date, checkOut: Date) => {
    const disponivel = await prisma.reserva.findFirst({
        where: {
            quartoId,
            AND: [{ checkIn: { lte: checkOut } }, { checkOut: { gte: checkIn } }],
        },
    });

    return !disponivel;
};

export const atualizarReservaRepository = async (id: number, data: UpdateReservaDTO) => {
    return await prisma.reserva.update({
        where: { id },
        data,
    });
};

export const deletarReservaRepository = async (id: number) => {
    return await prisma.reserva.delete({
        where: { id },
    });
};

//fins de consulta
export const listarReservasRepository = async () => {
    return await prisma.reserva.findMany({});
};
