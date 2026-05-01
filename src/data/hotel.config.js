export const db = {
    hotels: [
        {
            id: "hotel-don",
            name: "Гостиница ДОН",
            slug: "don",
            city: "Вёшенская",
            description: "Гостиница с номерами на втором и третьем этажах и рестораном на первом",

            hero: {
                title: "Гостиница ДОН",
                subtitle: "Уютное размещение у Дона, набережной и центра Вёшенской",
                backgroundImage: "/images/hotels/hero.webp",
                badges: ["от 1200 ₽", "питание", "парковка", "у Дона"],
                actionText: "Войти",
            },

            settings: {
                allowRoomBooking: true,
                allowBedBooking: true,
                foodEnabled: true,
            },
        }
    ],

    floors: [
        {
            id: "floor-don-1",
            hotelId: "hotel-don",
            number: 1,
            type: "service",
            title: "1 этаж",
            description: "Ресторан / кухня / питание",
            backgroundImage: "/images/floors/floor-1.webp",
        },
        {
            id: "floor-don-2",
            hotelId: "hotel-don",
            number: 2,
            type: "residential",
            title: "2 этаж",
            description: "Номера",
            backgroundImage: "/images/floors/floor-2.webp",
        },
        {
            id: "floor-don-3",
            hotelId: "hotel-don",
            number: 3,
            type: "residential",
            title: "3 этаж",
            description: "Номера с балконами",
            backgroundImage: "/images/floors/floor-3.webp",
        },
    ],

    rooms: [
        {
            id: "room-201",
            hotelId: "hotel-don",
            floorId: "floor-don-2",
            number: "201",
            title: "Номер 201",
            status: "available",
            bookingMode: "both",
            pricePerRoom: 2500,
            pricePerBed: 1200,
            plan: {
                width: 600,
                height: 450,
            },
            media: {
                images: [
                    "/images/rooms/201-1.webp",
                    "/images/rooms/201-2.webp"
                ],
                video: "/videos/rooms/201.mp4"
            },
            furniture: [
                // КРОВАТИ (развернуты на 90°)
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

                // ТУМБОЧКА между кроватями
                {
                    id: "nightstand-1",
                    type: "nightstand",
                    x: 30,
                    y: 165,
                },

                // ТЕЛЕВИЗОР (на правой стене, напротив кроватей)
                {
                    id: "tv-1",
                    type: "tv",
                    x: 530,
                    y: 170,
                    rotation: 270,
                },

                // ТУМБА ПОД ТВ (новый элемент)
                {
                    id: "tv-stand",
                    type: "tv_stand",
                    x: 490,
                    y: 165,
                    rotation: 270,
                },

                // ШКАФ (внизу справа)
                {
                    id: "wardrobe-1",
                    type: "wardrobe",
                    x: 460,
                    y: 370,
                },

                // ХОЛОДИЛЬНИК (между шкафом и дверью)
                {
                    id: "fridge-1",
                    type: "fridge",
                    x: 380,
                    y: 370,
                },

                // СТОЛ (слева от двери)
                {
                    id: "table-1",
                    type: "table",
                    x: 120,
                    y: 370,
                },
            ]
        },
        {
            id: "room-202",
            hotelId: "hotel-don",
            floorId: "floor-don-2",
            number: "202",
            title: "Номер 202",
            status: "available",
            bookingMode: "both",
            pricePerRoom: 2500,
            pricePerBed: 1200,
            plan: {
                width: 600,
                height: 450,
            },
            media: {
                images: [
                    "/images/rooms/201-1.webp",
                    "/images/rooms/201-2.webp"
                ],
                video: "/videos/rooms/201.mp4"
            }
        },
        {
            id: "room-203",
            hotelId: "hotel-don",
            floorId: "floor-don-2",
            number: "203",
            title: "Номер 203",
            status: "available",
            bookingMode: "both",
            pricePerRoom: 2500,
            pricePerBed: 1200,
            plan: {
                width: 600,
                height: 450,
            },
            media: {
                images: [
                    "/images/rooms/201-1.webp",
                    "/images/rooms/201-2.webp"
                ],
                video: "/videos/rooms/201.mp4"
            }
        },
        {
            id: "room-204",
            hotelId: "hotel-don",
            floorId: "floor-don-2",
            number: "204",
            title: "Номер 204",
            status: "available",
            bookingMode: "both",
            pricePerRoom: 2500,
            pricePerBed: 1200,
            plan: {
                width: 600,
                height: 450,
            },
            media: {
                images: [
                    "/images/rooms/201-1.webp",
                    "/images/rooms/201-2.webp"
                ],
                video: "/videos/rooms/201.mp4"
            }
        },
        {
            id: "room-205",
            hotelId: "hotel-don",
            floorId: "floor-don-2",
            number: "205",
            title: "Номер 205",
            status: "available",
            bookingMode: "both",
            pricePerRoom: 2500,
            pricePerBed: 1200,
            plan: {
                width: 600,
                height: 450,
            },
            media: {
                images: [
                    "/images/rooms/201-1.webp",
                    "/images/rooms/201-2.webp"
                ],
                video: "/videos/rooms/201.mp4"
            }
        },
        {
            id: "room-206",
            hotelId: "hotel-don",
            floorId: "floor-don-2",
            number: "206",
            title: "Номер 206",
            status: "available",
            bookingMode: "both",
            pricePerRoom: 2500,
            pricePerBed: 1200,
            plan: {
                width: 600,
                height: 450,
            },
            media: {
                images: [
                    "/images/rooms/201-1.webp",
                    "/images/rooms/201-2.webp"
                ],
                video: "/videos/rooms/201.mp4"
            }
        },
        {
            id: "room-207",
            hotelId: "hotel-don",
            floorId: "floor-don-2",
            number: "207",
            title: "Номер 207",
            status: "available",
            bookingMode: "both",
            pricePerRoom: 2500,
            pricePerBed: 1200,
            plan: {
                width: 600,
                height: 450,
            },
            media: {
                images: [
                    "/images/rooms/201-1.webp",
                    "/images/rooms/201-2.webp"
                ],
                video: "/videos/rooms/201.mp4"
            }
        },
        {
            id: "room-208",
            hotelId: "hotel-don",
            floorId: "floor-don-2",
            number: "208",
            title: "Номер 208",
            status: "available",
            bookingMode: "both",
            pricePerRoom: 2500,
            pricePerBed: 1200,
            plan: {
                width: 600,
                height: 450,
            },
            media: {
                images: [
                    "/images/rooms/201-1.webp",
                    "/images/rooms/201-2.webp"
                ],
                video: "/videos/rooms/201.mp4"
            }
        },
        {
            id: "room-209",
            hotelId: "hotel-don",
            floorId: "floor-don-2",
            number: "209",
            title: "Номер 209",
            status: "available",
            bookingMode: "both",
            pricePerRoom: 2500,
            pricePerBed: 1200,
            plan: {
                width: 600,
                height: 450,
            },
            media: {
                images: [
                    "/images/rooms/201-1.webp",
                    "/images/rooms/201-2.webp"
                ],
                video: "/videos/rooms/201.mp4"
            }
        },
        {
            id: "room-210",
            hotelId: "hotel-don",
            floorId: "floor-don-2",
            number: "210",
            title: "Номер 210",
            status: "available",
            bookingMode: "both",
            pricePerRoom: 2500,
            pricePerBed: 1200,
            plan: {
                width: 600,
                height: 450,
            },
            media: {
                images: [
                    "/images/rooms/201-1.webp",
                    "/images/rooms/201-2.webp"
                ],
                video: "/videos/rooms/201.mp4"
            }
        },
    ],

    beds: [
        {
            id: "bed-201-1",
            roomId: "room-201",
            title: "Кровать 1",
            status: "available",
        },
        {
            id: "bed-201-2",
            roomId: "room-201",
            title: "Кровать 2",
            status: "available",
        },

        {
            id: "bed-202-1",
            roomId: "room-202",
            title: "Кровать 1",
            status: "available",
        },
    ],

    foodTariffs: [
        {
            id: "food-none",
            title: "Без питания",
            type: "without_food",
            pricePerDay: 0,
        },
        {
            id: "food-breakfast",
            title: "Завтрак",
            type: "breakfast",
            pricePerDay: 300,
        },
        {
            id: "food-full",
            title: "Полный пансион",
            type: "full_board",
            pricePerDay: 900,
        },
    ],
};