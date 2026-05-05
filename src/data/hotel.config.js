import { floors } from "./floors";
import { rooms } from "./rooms";
import { beds } from "./beds";
import { foodTariffs } from "./foodTariffs";
import { areas } from "./areas";

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
                badges: ["от 2000 ₽", "питание", "парковка", "у Дона"],
                actionText: "Войти",
            },

            settings: {
                allowRoomBooking: true,
                allowBedBooking: true,
                foodEnabled: true,
            },
        },
    ],

    floors,
    rooms,
    beds,
    foodTariffs,
    areas,
};