import { z } from "zod";

export const schema = z.object({
    id: z.number(),
    name: z.string().min(2),
    email: z.string().email(),
    roomNumber: z.number().min(1),
    checkIn: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Data de check-in inválida",
    }),
    checkOut: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Data de check-out inválida",
    }),
});

export const createReservationSchema = schema.omit({ id: true });

export const partialSchema = schema.partial();

export type Reservation = z.infer<typeof schema>;
