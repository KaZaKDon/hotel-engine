import { db } from "./hotel.config";

export function getHotelBySlug(slug) {
    return db.hotels.find((h) => h.slug === slug);
}

export function getFloorsByHotelId(hotelId) {
    return db.floors.filter((f) => f.hotelId === hotelId);
}

export function getFloorByHotelAndNumber(hotelId, number) {
    return db.floors.find(
        (floor) => floor.hotelId === hotelId && floor.number === Number(number)
    );
}

export function getRoomsByFloorId(floorId) {
    return db.rooms.filter((room) => room.floorId === floorId);
}

export function getFloorByNumber(hotelId, number) {
    return getFloorByHotelAndNumber(hotelId, number);
}

export function getRoomsByFloor(floorId) {
    return getRoomsByFloorId(floorId);
}

export function getAreaBySlug(hotelId, areaSlug) {
    return db.areas.find(
        (area) => area.hotelId === hotelId && area.slug === areaSlug
    );
}