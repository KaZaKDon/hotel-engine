export const floor3 = {
    id: "floor-don-3",
    hotelId: "hotel-don",
    number: 3,
    type: "residential",
    title: "3 этаж",
    description: "Номера",
    backgroundImage: "/images/floors/floor-3.webp",

    layout: {
        type: "hotel_floor",
        width: 100,
        height: 100,

        items: [
            // 🔵 верхняя сторона (нечётные)
            { id: "room-301", type: "room", number: "301", x: 5, y: 0, w: 16, h: 28 },
            { id: "room-303", type: "room", number: "303", x: 23, y: 0, w: 16, h: 28 },
            { id: "room-305", type: "room", number: "305", x: 41, y: 0, w: 16, h: 28 },
            { id: "room-307", type: "room", number: "307", x: 59, y: 0, w: 16, h: 28 },
            { id: "room-309", type: "room", number: "309", x: 77, y: 0, w: 16, h: 28 },

            // 🔵 нижняя сторона (чётные)
            { id: "room-302", type: "room", number: "302", x: 5, y: 62, w: 16, h: 28 },
            { id: "room-304", type: "room", number: "304", x: 23, y: 62, w: 16, h: 28 },
            { id: "room-306", type: "room", number: "306", x: 41, y: 62, w: 16, h: 28 },
            { id: "room-308", type: "room", number: "308", x: 59, y: 62, w: 16, h: 28 },
            { id: "room-310", type: "room", number: "310", x: 77, y: 62, w: 16, h: 28 },

            // 🔴 лестница (смещена вправо — как ты хотел)
            {
                id: "stairs-down-3",
                type: "stairs",
                direction: "down",
                title: "Лестница вниз",
                x: 88,
                y: 38,
                w: 12,
                h: 24,
            },
        ]
    },
};