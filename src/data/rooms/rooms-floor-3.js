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
        images: ["/images/rooms/1.webp", "/images/rooms/2.webp", "/images/rooms/3.webp", "/images/rooms/4.webp","/images/rooms/5.webp",],
        video: "/images/rooms/3.mp4",
    },
};

// 🔴 планировка: двуспальная
const doubleRoomFurniture = [
    {
        id: "bed-main",
        type: "bed_double",
        x: 40,
        y: 80,
        rotation: 270,
    },
    {
        id: "nightstand-left",
        type: "nightstand",
        x: 20,
        y: 55,
    },
    {
        id: "nightstand-right",
        type: "nightstand",
        x: 20,
        y: 265,
    },
    {
        id: "tv-1",
        type: "tv",
        x: 530,
        y: 160,
        rotation: 270,
    },
    {
        id: "tv-stand",
        type: "tv_stand",
        x: 490,
        y: 150,
        rotation: 270,
    },
    {
        id: "wardrobe-1",
        type: "wardrobe",
        x: 460,
        y: 370,
    },
    {
        id: "table-1",
        type: "table",
        x: 20,
        y: 370,
    },
    {
        id: "chair-1",
        type: "chair",
        x: 130,
        y: 390,
    },
    {
        id: "chair-2",
        type: "chair",
        x: 40,
        y: 325,
    },
];

const twinRoomFurniture = [
    {
        id: "bed-1",
        type: "bed_single",
        x: 75,
        y: 20,
        rotation: 270,
    },
    {
        id: "bed-2",
        type: "bed_single",
        x: 75,
        y: 170,
        rotation: 270,
    },

    {
        id: "nightstand-1",
        type: "nightstand",
        x: 20,
        y: 30,
    },
    {
        id: "nightstand-2",
        type: "nightstand",
        x: 20,
        y: 320,
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
        x: 300,
        y: 160,
        rotation: 270,
    },
    {
        id: "chair-1",
        type: "chair",
        x: 270,
        y: 170,
    },
    {
        id: "chair-2",
        type: "chair",
        x: 390,
        y: 170,
    },
];

const familyRoomFurniture = [
    // двуспальная кровать
    {
        id: "bed-main",
        type: "bed_double",
        x: 35,
        y: 60,
        rotation: 270,
    },

    // тумбочки
    {
        id: "nightstand-left",
        type: "nightstand",
        x: 15,
        y: 40,
    },
    {
        id: "nightstand-right",
        type: "nightstand",
        x: 15,
        y: 240,
    },

    // односпальная (для ребёнка)
    {
        id: "bed-child",
        type: "bed_single",
        x: 70,
        y: 290,
        rotation: 270,
    },

    // стол по центру
    {
        id: "table-1",
        type: "table",
        x: 300,
        y: 130,
        rotation: 270,
    },

    // 3 стула
    {
        id: "chair-1",
        type: "chair",
        x: 330,
        y: 60,
    },
    {
        id: "chair-2",
        type: "chair",
        x: 270,
        y: 140,
    },
    {
        id: "chair-3",
        type: "chair",
        x: 330,
        y: 220,
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
        y: 370,
    },

    // холодильник
    {
        id: "fridge-1",
        type: "fridge",
        x: 380,
        y: 370,
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