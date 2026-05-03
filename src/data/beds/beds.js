const createBedsForRoom = (roomNumber, count = 2) =>
    Array.from({ length: count }, (_, index) => ({
        id: `bed-${roomNumber}-${index + 1}`,
        roomId: `room-${roomNumber}`,
        title: `Кровать ${index + 1}`,
        status: "available",
    }));

export const beds = [
    ...createBedsForRoom("201"),
    ...createBedsForRoom("202"),
    ...createBedsForRoom("203"),
    ...createBedsForRoom("204"),
    ...createBedsForRoom("205"),
    ...createBedsForRoom("206"),

    ...createBedsForRoom("301"),
    ...createBedsForRoom("302"),
    ...createBedsForRoom("303"),
    ...createBedsForRoom("304"),
    ...createBedsForRoom("305"),
    ...createBedsForRoom("306"),
    ...createBedsForRoom("307"),
    ...createBedsForRoom("308"),
    ...createBedsForRoom("309"),
    ...createBedsForRoom("310"),
];