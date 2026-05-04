// базовые параметры
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

// 🔴 планировка: двуспальная
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
        y: 120,
        rotation: 270,
    },
    {
        id: "tv-stand",
        type: "tv_stand",
        x: 480,
        y: 115,
        rotation: 270,
    },
    {
        id: "wardrobe-1",
        type: "wardrobe",
        x: 450,
        y: 340,
    },
    {
        id: "table-1",
        type: "table",
        x: 150,
        y: 340,
    },
    {
        id: "chair-1",
        type: "chair",
        x: 140,
        y: 390,
    },
    {
        id: "chair-2",
        type: "chair",
        x: 220,
        y: 390,
    },
];

const twinRoomFurniture = [
    {
        id: "bed-1",
        type: "bed_single",
        x: 80,
        y: 40,
        rotation: 270,
    },
    {
        id: "bed-2",
        type: "bed_single",
        x: 80,
        y: 190,
        rotation: 270,
    },

    {
        id: "nightstand-1",
        type: "nightstand",
        x: 30,
        y: 95,
    },
    {
        id: "nightstand-2",
        type: "nightstand",
        x: 30,
        y: 245,
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
    {
        id: "chair-1",
        type: "chair",
        x: 95,
        y: 325,
    },
    {
        id: "chair-2",
        type: "chair",
        x: 190,
        y: 325,
    },
];

const familyRoomFurniture = [
    // двуспальная кровать
    {
        id: "bed-main",
        type: "bed_double",
        x: 200,
        y: 40,
    },

    // тумбочки
    {
        id: "nightstand-left",
        type: "nightstand",
        x: 160,
        y: 60,
    },
    {
        id: "nightstand-right",
        type: "nightstand",
        x: 360,
        y: 60,
    },

    // односпальная (для ребёнка)
    {
        id: "bed-child",
        type: "bed_single",
        x: 80,
        y: 180,
        rotation: 270,
    },

    // стол по центру
    {
        id: "table-1",
        type: "table",
        x: 220,
        y: 300,
    },

    // 3 стула
    {
        id: "chair-1",
        type: "chair",
        x: 200,
        y: 360,
    },
    {
        id: "chair-2",
        type: "chair",
        x: 260,
        y: 360,
    },
    {
        id: "chair-3",
        type: "chair",
        x: 320,
        y: 360,
    },

    // ТВ
    {
        id: "tv-1",
        type: "tv",
        x: 530,
        y: 140,
        rotation: 270,
    },

    // тумба под ТВ
    {
        id: "tv-stand",
        type: "tv_stand",
        x: 490,
        y: 135,
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

// 🔗 привязка планировки
const roomFurnitureMap = {
    "301": doubleRoomFurniture,
    "302": doubleRoomFurniture,
    "309": doubleRoomFurniture,
    "310": doubleRoomFurniture,

    "303": twinRoomFurniture,
    "304": twinRoomFurniture,
    "307": twinRoomFurniture,
    "308": twinRoomFurniture,

    "305": familyRoomFurniture,
    "306": familyRoomFurniture,
};

const roomMetaMap = {
    "301": { roomType: "double", capacity: 2, bookableUnit: "room" },
    "302": { roomType: "double", capacity: 2, bookableUnit: "room" },

    "303": { roomType: "twin", capacity: 2, bookableUnit: "both" },
    "304": { roomType: "twin", capacity: 2, bookableUnit: "both" },

    "305": { roomType: "family", capacity: 3, bookableUnit: "room" },
    "306": { roomType: "family", capacity: 3, bookableUnit: "room" },

    "307": { roomType: "twin", capacity: 2, bookableUnit: "both" },
    "308": { roomType: "twin", capacity: 2, bookableUnit: "both" },

    "309": { roomType: "double", capacity: 2, bookableUnit: "room" },
    "310": { roomType: "double", capacity: 2, bookableUnit: "room" },
};

// 📦 экспорт
export const roomsFloor3 = [
    "301", "302", "303", "304", "305",
    "306", "307", "308", "309", "310"
].map((number) => ({
    ...baseRoom,
    ...roomMetaMap[number],
    id: `room-${number}`,
    number,
    title: `Номер ${number}`,
    furniture: roomFurnitureMap[number] || [],
}));