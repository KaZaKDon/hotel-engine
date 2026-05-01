# Data Model

## Общий принцип

Модель данных проектируется так, чтобы сначала работать из файлов, а в будущем без полной переделки перейти на базу данных MySQL / MariaDB.

Каждая сущность должна иметь стабильный `id`.

Интерфейс должен получать данные из модели и не содержать захардкоженных этажей, номеров, кроватей или мебели.

---

# 1. Hotel

Гостиница.

## Поля

```js
{
  id: "hotel-don",
  name: "Гостиница ДОН",
  slug: "don",
  description: "Описание гостиницы",
  address: "Адрес гостиницы",
  city: "Вёшенская",
  contacts: {
    phone: "+7...",
    email: "hotel@example.ru",
    telegram: "@hotel"
  },
  mediaIds: ["media-hotel-main"],
  settings: {
    allowRoomBooking: true,
    allowBedBooking: true,
    foodEnabled: true
  }
}
2. Floor

Этаж гостиницы.

Этаж может быть жилым, сервисным или смешанным.

Типы этажа
residential — жилой
service — сервисный
mixed — смешанный
Поля
{
  id: "floor-don-2",
  hotelId: "hotel-don",
  number: 2,
  title: "2 этаж",
  type: "residential",
  description: "Жилой этаж с номерами",
  planImageId: "media-floor-2-plan",
  corridorVideoId: "media-floor-2-corridor"
}
3. Room

Номер.

Статусы номера
available — свободен
reserved — забронирован
occupied — занят
disabled — недоступен
Режим бронирования
room — только номер целиком
bed — только койко-места
both — номер целиком и койко-места
Поля
{
  id: "room-201",
  hotelId: "hotel-don",
  floorId: "floor-don-2",
  number: "201",
  title: "Номер 201",
  description: "Одноместный номер",
  status: "available",
  bookingMode: "both",
  pricePerRoom: 2500,
  pricePerBed: 1200,
  mediaIds: [
    "media-room-201-photo",
    "media-room-201-video",
    "media-room-201-plan"
  ]
}
4. Bed

Койко-место.

Статусы кровати
available — свободна
reserved — забронирована
occupied — занята
disabled — недоступна
Поля
{
  id: "bed-201-1",
  hotelId: "hotel-don",
  roomId: "room-201",
  title: "Кровать 1",
  number: 1,
  status: "available",
  price: 1200,
  position: {
    x: 120,
    y: 180,
    width: 80,
    height: 180,
    rotation: 0
  }
}
5. Furniture

Справочник мебели.

Мебель хранится отдельно, чтобы её можно было использовать в разных номерах.

Примеры мебели
bed
nightstand
wardrobe
tv
fridge
table
chair
sofa
mirror
bathroom
sink
shower
Поля
{
  id: "furniture-tv",
  type: "tv",
  title: "Телевизор",
  icon: "tv",
  defaultWidth: 80,
  defaultHeight: 40
}
6. RoomFurniture

Мебель, размещённая в конкретном номере.

Эта сущность нужна для будущей админки, чтобы можно было расставлять мебель на плане комнаты.

Поля
{
  id: "room-furniture-201-tv",
  hotelId: "hotel-don",
  roomId: "room-201",
  furnitureId: "furniture-tv",
  title: "Телевизор",
  position: {
    x: 300,
    y: 40,
    width: 80,
    height: 40,
    rotation: 0
  }
}
7. Media

Медиа-файл.

Используется для гостиницы, этажа, номера и других объектов.

Типы медиа
image — фото
video — видео
plan — план
Владельцы медиа
hotel
floor
room
zone
Поля
{
  id: "media-room-201-video",
  hotelId: "hotel-don",
  ownerType: "room",
  ownerId: "room-201",
  type: "video",
  title: "Видео номера 201",
  url: "/videos/rooms/201.mp4",
  sortOrder: 1
}
8. FoodTariff

Тариф питания.

Типы тарифов
without_food — без питания
breakfast — завтрак
full_board — полный пансион
Поля
{
  id: "food-don-breakfast",
  hotelId: "hotel-don",
  type: "breakfast",
  title: "Завтрак",
  description: "Проживание с завтраком",
  pricePerDay: 300,
  enabled: true
}
9. Booking

Заявка на бронирование.

Статусы заявки
new — новая
confirmed — подтверждена
cancelled — отменена
completed — завершена
Поля
{
  id: "booking-001",
  hotelId: "hotel-don",
  roomId: "room-201",
  bedId: null,
  guestName: "Иван",
  guestPhone: "+7...",
  dateFrom: "2026-05-01",
  dateTo: "2026-05-03",
  foodTariffId: "food-don-breakfast",
  status: "new",
  comment: "Комментарий гостя",
  createdAt: "2026-04-30T12:00:00"
}

Если бронируется весь номер:

bedId: null

Если бронируется койко-место:

bedId: "bed-201-1"
10. Zone

Зона на этаже.

Используется для кухни, ресепшена, кафе, санузла, общего помещения.

Типы зон
food — питание
reception — ресепшен
service — служебная зона
common — общая зона
sanitary — санузел
Поля
{
  id: "zone-don-food-1",
  hotelId: "hotel-don",
  floorId: "floor-don-1",
  type: "food",
  title: "Кухня / питание",
  description: "Зона питания на первом этаже",
  mediaIds: ["media-zone-food-photo"],
  position: {
    x: 100,
    y: 150,
    width: 300,
    height: 200
  }
}
11. AdminUser

Администратор.

Роли
owner — владелец
manager — менеджер
editor — редактор
Поля
{
  id: "admin-001",
  hotelId: "hotel-don",
  name: "Администратор",
  email: "admin@example.ru",
  role: "owner",
  active: true
}
12. Будущие таблицы MySQL

При переходе на базу модель может быть разложена на таблицы:

hotels
floors
rooms
beds
furniture
room_furniture
media
food_tariffs
zones
bookings
admin_users
13. Важные правила модели
1. Не хардкодить номера

Нельзя:

if (room.number === "201") {
  ...
}

Нужно:

rooms.map(room => ...)
2. Не хардкодить этажи

Нельзя:

showSecondFloor()

Нужно:

floors.map(floor => ...)
3. Номер и кровать имеют разные статусы

Номер может быть свободен, но часть кроватей может быть занята.

4. Бронь может быть двух типов
- бронь номера целиком;
- бронь конкретного койко-места.
5. Мебель должна быть редактируемой

Мебель хранится отдельно от номера и размещается через RoomFurniture.

6. Медиа отделены от сущностей

Фото, видео и планы не должны быть просто строками внутри номера. Они должны храниться как отдельные объекты Media.

7. Система должна быть готова к админке

Любой объект, который пользователь видит на сайте, в будущем должен редактироваться через админ-панель.
hero: {
  title: "Гостиница ДОН",
  subtitle: "Уютная гостиница у реки Дон",
  backgroundImageId: "media-hotel-don-hero",
  badges: [
    "Номера от 1200 ₽",
    "Парковка",
    "Питание",
    "У реки",
    "На набережной",
    "Сосновый лес"
  ]
}