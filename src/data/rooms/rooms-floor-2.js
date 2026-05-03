const baseRoom = {
    hotelId: "hotel-don",
    floorId: "floor-don-2",
    status: "available",
    bookingMode: "both",
    pricePerRoom: 2500,
    pricePerBed: 1200,
    plan: {
        width: 600,
        height: 450,
    },
    media: {
        images: ["/images/rooms/201-1.webp", "/images/rooms/201-2.webp"],
        video: "/videos/rooms/201.mp4",
    },
};

const defaultFurniture = [
    {
        id: "bed-1",
        type: "bed_single",
        x: 80,
        y: 10,
        rotation: 270,
    },
    {
        id: "bed-2",
        type: "bed_single",
        x: 80,
        y: 160,
        rotation: 270,
    },
    {
        id: "nightstand-1",
        type: "nightstand",
        x: 30,
        y: 165,
    },
    {
        id: "tv-1",
        type: "tv",
        x: 530,
        y: 170,
        rotation: 270,
    },
    {
        id: "tv-stand",
        type: "tv_stand",
        x: 490,
        y: 165,
        rotation: 270,
    },
    {
        id: "wardrobe-1",
        type: "wardrobe",
        x: 460,
        y: 370,
    },
    {
        id: "fridge-1",
        type: "fridge",
        x: 380,
        y: 370,
    },
    {
        id: "table-1",
        type: "table",
        x: 120,
        y: 370,
    },
];

export const roomsFloor2 = ["201", "202", "203", "204", "205", "206"].map((number) => ({
    ...baseRoom,
    id: `room-${number}`,
    number,
    title: `Номер ${number}`,
    furniture: defaultFurniture,
}));