export const adminStats = [
    { id: "requests", label: "Заявки сегодня", value: 4 },
    { id: "free", label: "Свободные номера", value: 9 },
    { id: "busy", label: "Занятые номера", value: 7 },
    { id: "checkin", label: "Заезды сегодня", value: 2 },
];

export const bookingRequests = [
    {
        id: "B-001",
        guestName: "Иван Петров",
        phone: "+7 900 111-22-33",
        room: "305",
        dates: "10.05 — 12.05",
        status: "new",
    },
    {
        id: "B-002",
        guestName: "Анна Смирнова",
        phone: "+7 900 444-55-66",
        room: "301",
        dates: "11.05 — 14.05",
        status: "confirmed",
    },
    {
        id: "B-003",
        guestName: "Сергей Иванов",
        phone: "+7 900 777-88-99",
        room: "203",
        dates: "12.05 — 13.05",
        status: "occupied",
    },
];

export const adminRooms = [
    { number: "201", type: "Трёхместный", capacity: 3, price: 2500, status: "free" },
    { number: "202", type: "Трёхместный", capacity: 3, price: 2500, status: "free" },
    { number: "301", type: "Двухместный", capacity: 2, price: 2800, status: "booked" },
    { number: "305", type: "Семейный", capacity: 3, price: 3200, status: "occupied" },
];