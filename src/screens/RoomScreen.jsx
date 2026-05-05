import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getHotelBySlug } from "../data/selectors";
import { db } from "../data/hotel.config";
import RoomPlan from "../components/RoomPlan";
import "./room.css";

export default function RoomScreen() {
    const { hotelSlug, roomNumber } = useParams();
    const navigate = useNavigate();

    const [selectedBedId, setSelectedBedId] = useState(null);
    const [imageIndex, setImageIndex] = useState(0);
    const [videoOpen, setVideoOpen] = useState(false);

    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");
    const [foodTariffId, setFoodTariffId] = useState("food-none");
    const [bookingModalOpen, setBookingModalOpen] = useState(false);
    const [guestName, setGuestName] = useState("");
    const [guestPhone, setGuestPhone] = useState("");
    const [guestComment, setGuestComment] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [galleryOpen, setGalleryOpen] = useState(false);

    const hotel = getHotelBySlug(hotelSlug);
    if (!hotel) return <div>Гостиница не найдена</div>;

    const room = db.rooms.find(
        (item) => item.hotelId === hotel.id && item.number === roomNumber
    );
    if (!room) return <div>Номер не найден</div>;

    const images = room.media?.images || [];
    const currentImage = images[imageIndex] || images[0];
    const hasVideo = Boolean(room.media?.video);
    const foodTariffs = db.foodTariffs || [];
    const selectedFood = foodTariffs.find((item) => item.id === foodTariffId);

    const showPrevImage = () => {
        if (!images.length) return;
        setImageIndex((current) => (current - 1 + images.length) % images.length);
    };

    const showNextImage = () => {
        if (!images.length) return;
        setImageIndex((current) => (current + 1) % images.length);
    };

    const handleBookingSubmit = async (e) => {
        e.preventDefault();

        const booking = {
            id: crypto.randomUUID(),
            hotelId: hotel.id,
            hotelName: hotel.name,
            roomId: room.id,
            roomNumber: room.number,
            roomTitle: room.title,
            dateFrom,
            dateTo,
            foodTariffId,
            foodTariffTitle: selectedFood?.title || "Без питания",
            guestName,
            guestPhone,
            comment: guestComment,
            status: "new",
            bookingType: "room",
            createdAt: new Date().toISOString(),
        };

        // 👉 Данные под API (то, что ждёт PHP)
        const payload = {
            hotel: booking.hotelName,
            room: booking.roomNumber,
            bed: booking.roomTitle,
            name: booking.guestName,
            phone: booking.guestPhone,
            checkIn: booking.dateFrom,
            checkOut: booking.dateTo,
            meals: booking.foodTariffTitle,
        };

        let apiSuccess = false;

        try {
            const res = await fetch("/api/booking/index.php", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const result = await res.json();

            if (res.ok && result.success) {
                apiSuccess = true;
            } else {
                console.warn("API ответ:", result);
            }
        } catch (err) {
            console.error("Ошибка API:", err);
        }

        // 👉 fallback (оставляем, если вдруг API упадёт)
        const savedBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
        savedBookings.push(booking);
        localStorage.setItem("bookings", JSON.stringify(savedBookings));

        setBookingModalOpen(false);
        setGuestName("");
        setGuestPhone("");
        setGuestComment("");

        if (apiSuccess) {
            setSuccessMessage("Заявка отправлена. Мы свяжемся с вами.");
        } else {
            setSuccessMessage("Заявка сохранена локально. Связь с сервером временно недоступна.");
        }

        console.log("Новая заявка:", booking);
    };

    const openGallery = (index) => {
        setImageIndex(index);
        setGalleryOpen(true);
    };

    return (
        <main className="room-screen">
            <button className="back-button" onClick={() => navigate(-1)}>
                ← Назад
            </button>

            <div className="room-layout">
                <section className="room-left">
                    <h1 className="room-title">{room.title}</h1>
                    <div className="room-meta">
                        <span>
                            {room.roomType === "double" && "Двухместный"}
                            {room.roomType === "twin" && "Раздельные кровати"}
                            {room.roomType === "family" && "Семейный"}
                            {room.roomType === "triple" && "Трёхместный"}
                        </span>

                        <span>• {room.capacity} места</span>
                    </div>
                    <RoomPlan
                        room={room}
                        selectedBedId={selectedBedId}
                        onSelectBed={setSelectedBedId}
                    />

                    {selectedBedId && (
                        <div className="bed-hint">
                            Вы выбрали место в комнате. Бронирование сейчас оформляется на
                            весь номер.
                        </div>
                    )}

                    <div className="room-gallery">
                        {currentImage ? (
                            <button
                                type="button"
                                className="room-gallery-main"
                                onClick={() => openGallery(imageIndex)}
                            >
                                <img src={currentImage} alt={`${room.title} фото`} />
                                {images.length > 1 && (
                                    <span className="room-gallery-badge">
                                        Фото {imageIndex + 1} / {images.length}
                                    </span>
                                )}
                            </button>
                        ) : (
                            <div className="room-gallery-empty">Нет фото</div>
                        )}
                    </div>

                    {galleryOpen && images.length > 0 && (
                        <div className="modal" onClick={() => setGalleryOpen(false)}>
                            <div className="gallery-modal" onClick={(e) => e.stopPropagation()}>
                                <button
                                    type="button"
                                    className="modal-close"
                                    onClick={() => setGalleryOpen(false)}
                                >
                                    ×
                                </button>

                                <button
                                    type="button"
                                    className="gallery-arrow gallery-arrow-left"
                                    onClick={showPrevImage}
                                    disabled={images.length < 2}
                                >
                                    ‹
                                </button>

                                <img
                                    className="gallery-modal-image"
                                    src={images[imageIndex]}
                                    alt={`${room.title} фото ${imageIndex + 1}`}
                                />

                                <button
                                    type="button"
                                    className="gallery-arrow gallery-arrow-right"
                                    onClick={showNextImage}
                                    disabled={images.length < 2}
                                >
                                    ›
                                </button>
                            </div>
                        </div>
                    )}

                    {hasVideo && (
                        <button
                            type="button"
                            className="video-button"
                            onClick={() => setVideoOpen(true)}
                        >
                            Смотреть видео
                        </button>
                    )}
                </section>

                <aside className="room-right">
                    <section className="booking-panel">
                        <h2>Бронирование</h2>

                        <div className="booking-grid">
                            <label>
                                Заезд
                                <input
                                    type="date"
                                    value={dateFrom}
                                    onChange={(e) => setDateFrom(e.target.value)}
                                />
                            </label>

                            <label>
                                Выезд
                                <input
                                    type="date"
                                    value={dateTo}
                                    onChange={(e) => setDateTo(e.target.value)}
                                />
                            </label>

                            <label>
                                Питание
                                <select
                                    value={foodTariffId}
                                    onChange={(e) => setFoodTariffId(e.target.value)}
                                >
                                    {foodTariffs.map((tariff) => (
                                        <option key={tariff.id} value={tariff.id}>
                                            {tariff.title}
                                            {tariff.pricePerDay
                                                ? ` +${tariff.pricePerDay} ₽/день`
                                                : ""}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        </div>

                        <div className="booking-summary">
                            <span>Номер:</span>
                            <strong>{room.title}</strong>
                        </div>

                        <div className="booking-summary">
                            <span>Стоимость:</span>
                            <strong>от {room.pricePerRoom} ₽ / ночь</strong>
                        </div>

                        {selectedFood && (
                            <div className="booking-summary">
                                <span>Питание:</span>
                                <strong>{selectedFood.title}</strong>
                            </div>
                        )}

                        <button
                            type="button"
                            className="booking-button"
                            onClick={() => setBookingModalOpen(true)}
                            disabled={!dateFrom || !dateTo}
                        >
                            Забронировать номер
                        </button>

                        {(!dateFrom || !dateTo) && (
                            <p className="booking-note">Выберите даты заезда и выезда</p>
                        )}

                        {successMessage && (
                            <p className="booking-success">{successMessage}</p>
                        )}
                    </section>
                </aside>
            </div>

            {videoOpen && hasVideo && (
                <div className="modal" onClick={() => setVideoOpen(false)}>
                    <div className="modal-content video-modal-content" onClick={(e) => e.stopPropagation()}>
                        <button
                            type="button"
                            className="modal-close"
                            onClick={() => setVideoOpen(false)}
                        >
                            ×
                        </button>

                        <video
                            className="room-video"
                            controls
                            autoPlay
                            playsInline
                            src={room.media?.video}
                        />
                    </div>
                </div>
            )
            }

            {
                bookingModalOpen && (
                    <div className="modal" onClick={() => setBookingModalOpen(false)}>
                        <form
                            className="booking-modal"
                            onSubmit={handleBookingSubmit}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                type="button"
                                className="modal-close"
                                onClick={() => setBookingModalOpen(false)}
                            >
                                ×
                            </button>

                            <h2>Заявка на бронирование</h2>

                            <div className="booking-modal-summary">
                                <p>
                                    <strong>Номер:</strong> {room.title}
                                </p>
                                <p>
                                    <strong>Даты:</strong> {dateFrom} — {dateTo}
                                </p>
                                <p>
                                    <strong>Питание:</strong> {selectedFood?.title || "Без питания"}
                                </p>
                            </div>

                            <label>
                                Ваше имя
                                <input
                                    type="text"
                                    value={guestName}
                                    onChange={(e) => setGuestName(e.target.value)}
                                    placeholder="Иван"
                                    required
                                />
                            </label>

                            <label>
                                Телефон
                                <input
                                    type="tel"
                                    value={guestPhone}
                                    onChange={(e) => setGuestPhone(e.target.value)}
                                    placeholder="+7..."
                                    required
                                />
                            </label>

                            <label>
                                Комментарий
                                <textarea
                                    value={guestComment}
                                    onChange={(e) => setGuestComment(e.target.value)}
                                    placeholder="Например: заезд вечером"
                                    rows="4"
                                />
                            </label>

                            <button type="submit" className="booking-button">
                                Отправить заявку
                            </button>
                        </form>
                    </div>
                )
            }
        </main >
    );
}