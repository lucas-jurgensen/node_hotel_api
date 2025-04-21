import { deleteReservation, getReservations, newReservation, updateReservation } from "../services/reservationService";

export const getReservationsHandler = async (req, res) => {
    try {
        const reservations = await getReservations();
        res.status(200).json({ reservations });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "erro na busca de reservas" });
    }
};

export const newReservationHandler = async (req, res) => {
    try {
        const { name, email, roomNumber, checkIn, checkOut } = req.body;

        if (!name || !email || !roomNumber || !checkIn || !checkOut) {
            return res.status(400).json({ error: "Todos os campos são obrigatórios" });
        }

        const data = await newReservation({
            name,
            email,
            roomNumber,
            checkIn,
            checkOut,
        });

        res.status(201).json({ message: "reserva criada com sucesso", data });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message || "erro ao fazer uma nova reserva" });
    }
};

export const deleteReservationHandler = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ error: "id invalido" });
        }

        const deletedReservation = await deleteReservation(Number(id));
        if (!deletedReservation) {
            return res.status(404).json({ error: "reserva não encontrada" });
        }

        res.status(200).json({ message: "reserva deletada com sucesso", reservation: deletedReservation });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "erro ao deletar a reserva" });
    }
};

export const updateReservationHandler = async (req, res) => {
    try {
        const { id } = req.params;

        const reservationId = Number(id);

        if (isNaN(reservationId)) {
            return res.status(400).json({ error: "ID inválido" });
        }

        const { name, email, roomNumber, checkIn, checkOut } = req.body;

        const updatedReservation = await updateReservation(reservationId, req.body);

        res.status(200).json({ message: "reserva atualizada com sucesso", updatedReservation });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "erro ao atualizar a reserva" });
    }
};
