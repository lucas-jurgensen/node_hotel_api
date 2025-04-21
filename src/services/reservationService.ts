import { readFile, writeFile } from "fs/promises";
import { Reservation } from "../schema/reservationSchema";

const dataFile = "./src/data/reservations.json";

export const getReservations = async (): Promise<Reservation[]> => {
    try {
        const data = await readFile(dataFile, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        console.log("erro ao ler as reservas do hotel: ", error);
        return [];
    }
};

export const newReservation = async (reservation: Omit<Reservation, "id">): Promise<Reservation[]> => {
    try {
        const reservations = await getReservations();

        const hasConflict = reservations.some((r) => {
            if (r.roomNumber !== reservation.roomNumber) return false;

            const newCheckIn = new Date(reservation.checkIn).getTime();
            const newCheckOut = new Date(reservation.checkOut).getTime();
            const existingCheckIn = new Date(r.checkIn).getTime();
            const existingCheckOut = new Date(r.checkOut).getTime();

            return newCheckIn <= existingCheckOut && newCheckOut >= existingCheckIn;
        });

        if (hasConflict) {
            throw new Error("Este quarto já está reservado nesse período.");
        }

        const newId = reservations.length > 0 ? Math.max(...reservations.map((r) => r.id)) + 1 : 1;

        const newReservation = {
            id: newId,
            ...reservation,
        };

        reservations.push(newReservation);

        await writeFile(dataFile, JSON.stringify(reservations, null, 2));
        return reservations;
    } catch (error) {
        console.log("erro ao fazer reserva no hotel: ", error);
        throw error;
    }
};

export const deleteReservation = async (id: number): Promise<Reservation> => {
    try {
        const reservations = await getReservations();
        const reservationToDelete = reservations.find((reservation) => reservation.id === id);

        if (!reservationToDelete) {
            throw new Error("reserva não encontrada");
        }

        const updatedReservations = reservations.filter((reservation) => reservation.id !== id);

        await writeFile(dataFile, JSON.stringify(updatedReservations, null, 2));

        return reservationToDelete;
    } catch (error) {
        console.log("erro ao deletar a reserva: ", error);
        throw error;
    }
};

export const updateReservation = async (id: number, updatedData: Partial<Omit<Reservation, "id">>): Promise<Reservation> => {
    try {
        const reservations = await getReservations();

        const index = reservations.findIndex((reservation) => reservation.id === id);

        if (index === -1) {
            throw new Error("reserva não encontrada");
        }

        reservations[index] = {
            ...reservations[index],
            ...updatedData,
        };

        await writeFile(dataFile, JSON.stringify(reservations, null, 2));
        return reservations[index];
    } catch (error) {
        console.log("erro ao atualizar a reserva:", error);
        throw error;
    }
};
