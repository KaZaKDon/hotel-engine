export const areasFloor1 = [
    {
        id: "area-dining-hall",
        hotelId: "hotel-don",
        floorId: "floor-don-1",
        slug: "dining-hall",
        title: "Зал со столами",
        description: "Общий зал питания с расстановкой столов для гостей гостиницы.",
        capacity: 24,

        media: {
            images: [
                "/images/rooms/1.webp",
                "/images/rooms/2.webp",
                "/images/rooms/3.webp",
                "/images/rooms/4.webp",
                "/images/rooms/5.webp",
            ],
            video: "/images/rooms/1.mp4",
        },

        plan: {
            width: 600,
            height: 420,
            furniture: [
                { id: "table-1", type: "table", title: "Стол 1", x: 120, y: 100 },
                { id: "table-2", type: "table", title: "Стол 2", x: 300, y: 100 },
                { id: "table-3", type: "table", title: "Стол 3", x: 120, y: 260 },
                { id: "table-4", type: "table", title: "Стол 4", x: 300, y: 260 },

                { id: "window-1", type: "window", title: "", x: 100, y: 415 },
                { id: "window-2", type: "window", title: "", x: 300, y: 415 },
                { id: "window-3", type: "window", title: "", x: 500, y: 415 },

                { id: "door-1", type: "door", title: "Вход", x: 520, y: 80 },
            ],
        },
    },
];