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

const tripleRoomFurniture = [
    // 3 односпальных кровати
    {
        id: "bed-1",
        type: "bed_single",
        x: 80,
        y: 30,
        rotation: 270,
    },
    {
        id: "bed-2",
        type: "bed_single",
        x: 80,
        y: 150,
        rotation: 270,
    },
    {
        id: "bed-3",
        type: "bed_single",
        x: 80,
        y: 270,
        rotation: 270,
    },

    // стол
    {
        id: "table-1",
        type: "table",
        x: 220,
        y: 320,
    },

    // 3 стула
    {
        id: "chair-1",
        type: "chair",
        x: 200,
        y: 380,
    },
    {
        id: "chair-2",
        type: "chair",
        x: 260,
        y: 380,
    },
    {
        id: "chair-3",
        type: "chair",
        x: 320,
        y: 380,
    },

    // ТВ
    {
        id: "tv-1",
        type: "tv",
        x: 530,
        y: 150,
        rotation: 270,
    },

    // тумба под ТВ
    {
        id: "tv-stand",
        type: "tv_stand",
        x: 490,
        y: 145,
        rotation: 270,
    },

    // шкаф
    {
        id: "wardrobe-1",
        type: "wardrobe",
        x: 460,
        y: 360,
    },

    // холодильник
    {
        id: "fridge-1",
        type: "fridge",
        x: 380,
        y: 360,
    },
];

const doubleRoomFurniture = [
    {
        id: "bed-main",
        type: "bed_double",
        x: 200,
        y: 60,
    },

    {
        id: "nightstand-left",
        type: "nightstand",
        x: 160,
        y: 80,
    },
    {
        id: "nightstand-right",
        type: "nightstand",
        x: 360,
        y: 80,
    },

    {
        id: "tv-1",
        type: "tv",
        x: 520,
        y: 140,
        rotation: 270,
    },
    {
        id: "tv-stand",
        type: "tv_stand",
        x: 480,
        y: 135,
        rotation: 270,
    },

    {
        id: "wardrobe-1",
        type: "wardrobe",
        x: 460,
        y: 360,
    },
    {
        id: "fridge-1",
        type: "fridge",
        x: 380,
        y: 360,
    },

    {
        id: "table-1",
        type: "table",
        x: 180,
        y: 340,
    },

    {
        id: "chair-1",
        type: "chair",
        x: 160,
        y: 390,
    },
    {
        id: "chair-2",
        type: "chair",
        x: 240,
        y: 390,
    },
];

const roomFurnitureMap = {
    "201": tripleRoomFurniture,
    "202": tripleRoomFurniture,
    "203": tripleRoomFurniture,
    "204": tripleRoomFurniture,

    "205": doubleRoomFurniture,
    "206": doubleRoomFurniture,
};

const roomMetaMap = {
    "201": { roomType: "triple", capacity: 3, bookableUnit: "both" },
    "202": { roomType: "triple", capacity: 3, bookableUnit: "both" },
    "203": { roomType: "triple", capacity: 3, bookableUnit: "both" },
    "204": { roomType: "triple", capacity: 3, bookableUnit: "both" },

    "205": { roomType: "double", capacity: 2, bookableUnit: "room" },
    "206": { roomType: "double", capacity: 2, bookableUnit: "room" },
};

export const roomsFloor2 = ["201", "202", "203", "204", "205", "206"].map((number) => ({
    ...baseRoom,
    ...roomMetaMap[number],
    id: `room-${number}`,
    number,
    title: `Номер ${number}`,
    furniture: roomFurnitureMap[number] || [],
}));