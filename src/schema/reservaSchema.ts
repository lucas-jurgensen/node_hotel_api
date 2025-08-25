import { z } from "zod";

export const criarReservaSchema = z.object({
    quartoId: z.number().positive(),
    checkIn: z
        .string()
        .refine((date) => !isNaN(Date.parse(date)), {
            message: "Data de check-in inválida",
        })
        .transform((str) => new Date(str)),
    checkOut: z
        .string()
        .refine((date) => !isNaN(Date.parse(date)), {
            message: "Data de check-out inválida",
        })
        .transform((str) => new Date(str)),
});

export const atualizarReservaSchema = criarReservaSchema.partial();

export const validarIdSchema = z.number().positive().min(1, "ID Inválido");
