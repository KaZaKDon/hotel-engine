const baseRoom = {
    hotelId: "hotel-don",
    floorId: "floor-don-3",
    status: "available",
    bookingMode: "both",
    pricePerRoom: 2800,
    pricePerBed: 1300,
    plan: {
        width: 600,
        height: 450,
    },
    media: {
        images: ["/images/rooms/201-1.webp", "/images/rooms/201-2.webp"],
        video: "/videos/rooms/201.mp4",
    },
};

export const roomsFloor3 = ["301", "302", "303", "304", "305", "306", "307", "308", "309", "310"].map(
    (number) => ({
        ...baseRoom,
        id: `room-${number}`,
        number,
        title: `Номер ${number}`,
    })
);