export interface CriarReservaDTO {
    quartoId: number;
    checkIn: Date;
    checkOut: Date;
}

export interface UpdateReservaDTO {
    checkIn?: Date;
    checkOut?: Date;
}
