import express from "express";
import { errorHandler, validateParcialUpdate, validateReservations } from "../middlewares/reservationMiddlewares";
import { deleteReservationHandler, getReservationsHandler, newReservationHandler, updateReservationHandler } from "../controllers/reservationControllers";

const router = express.Router();

router.get("/reservations", getReservationsHandler);

router.post("/reservation", validateReservations, newReservationHandler);

router.delete("/reservation/:id", deleteReservationHandler);

router.put("/reservation/:id", validateParcialUpdate, updateReservationHandler);

router.use(errorHandler);

export default router;
