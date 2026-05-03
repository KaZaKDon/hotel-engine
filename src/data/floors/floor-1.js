export const floor1 = {
    id: "floor-don-1",
    hotelId: "hotel-don",
    number: 1,
    type: "service",
    title: "1 этаж",
    description: "Кухня, стойка и зал питания",
    backgroundImage: "/images/floors/floor-1.webp",

    layout: {
        type: "restaurant",
        width: 100,
        height: 100,

        zones: [
            {
                id: "kitchen-1",
                type: "kitchen",
                title: "Кухня",
                x: 0,
                y: 0,
                w: 33,
                h: 100,
            },
            {
                id: "counter-1",
                type: "counter",
                title: "Стойка",
                x: 33,
                y: 0,
                w: 4,
                h: 100,
            },
            {
                id: "dining-hall-1",
                type: "dining_hall",
                title: "Зал со столами",
                x: 37,
                y: 0,
                w: 63,
                h: 100,
            },
        ],

        furniture: [
            {
                id: "table-1",
                type: "dining_table",
                title: "Стол 1",
                x: 48,
                y: 20,
            },
            {
                id: "table-2",
                type: "dining_table",
                title: "Стол 2",
                x: 70,
                y: 20,
            },
            {
                id: "table-3",
                type: "dining_table",
                title: "Стол 3",
                x: 48,
                y: 55,
            },
            {
                id: "table-4",
                type: "dining_table",
                title: "Стол 4",
                x: 70,
                y: 55,
            },
        ],
    },
};