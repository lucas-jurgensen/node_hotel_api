import { ErrorRequestHandler, RequestHandler } from "express";
import { createReservationSchema, partialSchema, schema } from "../schema/reservationSchema";

export const validateReservations: RequestHandler = (req, res, next) => {
    const result = createReservationSchema.safeParse(req.body);

    if (!result.success) {
        res.status(400).json({ message: "dados invalidos", errors: result.error.format() });
        return;
    }

    req.body = result.data;
    next();
};

export const validateParcialUpdate: RequestHandler = (req, res, next) => {
    const result = partialSchema.safeParse(req.body);

    if (!result.success) {
        res.status(400).json({ message: "dados invalidos", error: result.error.format() });
    }

    req.body = result.data;
    next();
};

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.error("erro capturado no middleware:", err.message);
    res.status(500).json({ error: "erro interno do servidor" });
};
