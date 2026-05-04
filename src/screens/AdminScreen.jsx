import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminRooms, adminStats, bookingRequests } from "../data/admin.mock";
import "./admin.css";

const tabs = [
    { id: "dashboard", label: "Обзор" },
    { id: "bookings", label: "Заявки" },
    { id: "checkin", label: "Заселение" },
    { id: "rooms", label: "Номера" },
    { id: "media", label: "Фото / видео" },
    { id: "calendar", label: "Календарь" },
    { id: "reports", label: "Отчёты" },
];

const statusLabels = {
    new: "Новая",
    confirmed: "Подтверждена",
    occupied: "Заселён",
    cancelled: "Отменена",
    free: "Свободен",
    booked: "Бронь",
};

export default function AdminScreen() {
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState("dashboard");
    const [reportType, setReportType] = useState("room");
    const [loading, setLoading] = useState(false);
    const [localBookings, setLocalBookings] = useState(bookingRequests);

    const runReportLoading = () => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 800);
    };

    const updateBookingStatus = (bookingId, status) => {
        setLocalBookings((prev) =>
            prev.map((booking) =>
                booking.id === bookingId ? { ...booking, status } : booking
            )
        );
    };

    return (
        <main className="admin-screen">
            <aside className="admin-sidebar">
                <div className="admin-logo">
                    <strong>Hotel Admin</strong>
                    <span>demo panel</span>
                </div>

                <nav className="admin-nav">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            type="button"
                            className={activeTab === tab.id ? "active" : ""}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </aside>

            <section className="admin-content">
                <header className="admin-header">
                    <div>
                        <h1>Панель администратора</h1>
                        <p>Демонстрация возможностей полной версии</p>
                    </div>

                    <div className="admin-header-actions">
                        <button className="admin-back" onClick={() => navigate("/")}>
                            ← На сайт
                        </button>

                        <span className="admin-badge">DEMO</span>
                    </div>
                </header>

                {activeTab === "dashboard" && (
                    <section className="admin-grid fade-in">
                        {adminStats.map((item) => (
                            <article className="admin-card" key={item.id}>
                                <span>{item.label}</span>
                                <strong>{item.value}</strong>
                            </article>
                        ))}
                    </section>
                )}

                {activeTab === "bookings" && (
                    <section className="admin-panel fade-in">
                        <h2>Заявки на бронирование</h2>

                        <div className="admin-table">
                            {localBookings.map((booking) => (
                                <div className="admin-row" key={booking.id}>
                                    <span>{booking.id}</span>
                                    <strong>{booking.guestName}</strong>
                                    <span>{booking.phone}</span>
                                    <span>№ {booking.room}</span>
                                    <span>{booking.dates}</span>

                                    <span className={`status status-${booking.status}`}>
                                        {statusLabels[booking.status]}
                                    </span>

                                    <div className="admin-actions">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                updateBookingStatus(booking.id, "confirmed")
                                            }
                                        >
                                            Подтвердить
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                updateBookingStatus(booking.id, "occupied")
                                            }
                                        >
                                            Заселить
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                updateBookingStatus(booking.id, "cancelled")
                                            }
                                        >
                                            Отменить
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {activeTab === "checkin" && (
                    <section className="admin-panel fade-in">
                        <h2>Ручное заселение</h2>

                        <form className="admin-form">
                            <input placeholder="ФИО гостя" />
                            <input placeholder="Телефон" />

                            <select>
                                <option>Номер 201</option>
                                <option>Номер 202</option>
                                <option>Номер 301</option>
                                <option>Номер 305</option>
                            </select>

                            <input type="date" />
                            <input type="date" />

                            <select>
                                <option>Без питания</option>
                                <option>Завтрак</option>
                                <option>Полный пансион</option>
                            </select>

                            <textarea placeholder="Комментарий" rows="4" />

                            <button type="button">Заселить гостя</button>
                        </form>
                    </section>
                )}

                {activeTab === "rooms" && (
                    <section className="admin-panel fade-in">
                        <h2>Управление номерами</h2>

                        <div className="admin-room-list">
                            {adminRooms.map((room) => (
                                <article className="admin-room-card" key={room.number}>
                                    <h3>Номер {room.number}</h3>
                                    <p>
                                        {room.type} · {room.capacity} места
                                    </p>
                                    <strong>{room.price} ₽ / ночь</strong>

                                    <span className={`status status-${room.status}`}>
                                        {statusLabels[room.status]}
                                    </span>

                                    <button type="button">Редактировать</button>
                                </article>
                            ))}
                        </div>
                    </section>
                )}

                {activeTab === "media" && (
                    <section className="admin-panel fade-in">
                        <h2>Фото и видео номера</h2>

                        <form className="admin-form">
                            <select>
                                <option>Номер 201</option>
                                <option>Номер 301</option>
                                <option>Номер 305</option>
                            </select>

                            <input type="file" multiple />
                            <input type="file" accept="video/*" />

                            <button type="button">Сохранить медиа</button>
                        </form>

                        <p className="admin-hint">
                            В полной версии файлы будут загружаться на сервер и
                            привязываться к выбранному номеру.
                        </p>
                    </section>
                )}

                {activeTab === "calendar" && (
                    <section className="admin-panel fade-in">
                        <h2>Календарь загрузки</h2>

                        <div className="booking-calendar">
                            <div></div>

                            {["10.05", "11.05", "12.05", "13.05", "14.05"].map((day) => (
                                <strong key={day}>{day}</strong>
                            ))}

                            {["201", "202", "301", "305"].map((room) => (
                                <Fragment key={room}>
                                    <strong>№ {room}</strong>
                                    <span className="calendar-cell free">Свободно</span>
                                    <span className="calendar-cell booked">Бронь</span>
                                    <span className="calendar-cell occupied">Занято</span>
                                    <span className="calendar-cell occupied">Занято</span>
                                    <span className="calendar-cell free">Свободно</span>
                                </Fragment>
                            ))}
                        </div>
                    </section>
                )}

                {activeTab === "reports" && (
                    <section className="admin-panel fade-in">
                        <h2>Отчёты и выборки</h2>

                        <div className="report-tabs">
                            <button
                                type="button"
                                className={reportType === "room" ? "active" : ""}
                                onClick={() => setReportType("room")}
                            >
                                По номеру
                            </button>

                            <button
                                type="button"
                                className={reportType === "guest" ? "active" : ""}
                                onClick={() => setReportType("guest")}
                            >
                                По гостю
                            </button>

                            <button
                                type="button"
                                className={reportType === "popular" ? "active" : ""}
                                onClick={() => setReportType("popular")}
                            >
                                Популярные номера
                            </button>
                        </div>

                        {reportType === "room" && (
                            <div className="report-box fade-in">
                                <h3>История по номеру</h3>

                                <div className="report-form">
                                    <select>
                                        <option>Номер 305</option>
                                        <option>Номер 301</option>
                                        <option>Номер 203</option>
                                    </select>

                                    <input type="date" />
                                    <input type="date" />

                                    <button
                                        type="button"
                                        className={loading ? "btn-loading" : ""}
                                        onClick={runReportLoading}
                                    >
                                        {loading ? "Формируем..." : "Сформировать отчёт"}
                                    </button>
                                </div>

                                <div className="report-result fade-in">
                                    <strong>Номер 305</strong>
                                    <p>Заселений за период: 6</p>
                                    <p>Занято дней: 18</p>
                                    <p>Средняя длительность проживания: 3 дня</p>

                                    <ul>
                                        <li>Иван Петров — 10.05–12.05</li>
                                        <li>Анна Смирнова — 14.05–18.05</li>
                                        <li>Сергей Иванов — 22.05–25.05</li>
                                    </ul>
                                </div>
                            </div>
                        )}

                        {reportType === "guest" && (
                            <div className="report-box fade-in">
                                <h3>История по гостю</h3>

                                <div className="report-form">
                                    <input placeholder="Фамилия, имя или телефон" />

                                    <button
                                        type="button"
                                        className={loading ? "btn-loading" : ""}
                                        onClick={runReportLoading}
                                    >
                                        {loading ? "Ищем..." : "Найти гостя"}
                                    </button>
                                </div>

                                <div className="report-result fade-in">
                                    <strong>Иван Петров</strong>
                                    <p>Количество визитов: 3</p>
                                    <p>Последний заезд: 10.05.2026</p>

                                    <ul>
                                        <li>Номер 305 — 10.05–12.05</li>
                                        <li>Номер 201 — 03.04–05.04</li>
                                        <li>Номер 301 — 18.03–20.03</li>
                                    </ul>
                                </div>
                            </div>
                        )}

                        {reportType === "popular" && (
                            <div className="report-box fade-in">
                                <h3>Популярность номеров</h3>

                                <div className="report-form">
                                    <input type="date" />
                                    <input type="date" />

                                    <button
                                        type="button"
                                        className={loading ? "btn-loading" : ""}
                                        onClick={runReportLoading}
                                    >
                                        {loading ? "Считаем..." : "Показать рейтинг"}
                                    </button>
                                </div>

                                <div className="popular-list fade-in">
                                    <div>
                                        <strong>№ 305</strong>
                                        <span>12 заселений</span>
                                    </div>

                                    <div>
                                        <strong>№ 301</strong>
                                        <span>9 заселений</span>
                                    </div>

                                    <div>
                                        <strong>№ 203</strong>
                                        <span>7 заселений</span>
                                    </div>

                                    <div>
                                        <strong>№ 206</strong>
                                        <span>5 заселений</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        <p className="admin-hint">
                            В полной версии отчёты будут формироваться из базы данных по
                            реальным бронированиям, заселениям, датам и гостям.
                        </p>
                    </section>
                )}

                <section className="admin-capabilities">
                    <h3>Возможности полной версии</h3>

                    <ul>
                        <li>Полноценная база данных бронирований</li>
                        <li>Контроль занятости номеров по датам</li>
                        <li>Календарь загрузки гостиницы</li>
                        <li>Ручное и автоматическое заселение</li>
                        <li>Управление фото и видео номеров</li>
                        <li>Роли пользователей и доступы</li>
                        <li>Интеграция онлайн-оплаты</li>
                    </ul>
                </section>

                <section className="admin-offer">
                    <div>
                        <span className="admin-offer-label">Коммерческое демо</span>
                        <h3>Заказать систему под вашу гостиницу</h3>
                        <p>
                            В полной версии система настраивается под реальные этажи,
                            номера, фото, видео, цены, бронирование, админку и базу данных
                            заказчика.
                        </p>
                    </div>

                    <div className="admin-offer-actions">
                        <button
                            type="button"
                            className="admin-order-button"
                            onClick={() => window.open("https://t.me/KazakDmitriy", "_blank")}
                        >
                            💬 Написать в Telegram
                        </button>

                        <a
                            href="mailto:vnukovdn@vk.com?subject=Заказ системы гостиницы&body=Здравствуйте, хочу обсудить разработку системы бронирования"
                            className="admin-email-link"
                        >
                            ✉ Написать на почту
                        </a>

                        <a
                            href="https://portfolio.vkazakdon.ru"
                            target="_blank"
                            rel="noreferrer"
                            className="admin-portfolio-link"
                        >
                            Портфолио разработчика
                        </a>
                    </div>
                </section>

                <section className="admin-pricing">
                    <h3>Стоимость и этапы разработки</h3>

                    <div className="admin-pricing-grid">
                        <article>
                            <strong>1. Демо и согласование</strong>
                            <p>Показываем интерфейс, фиксируем пожелания и структуру объекта.</p>
                        </article>

                        <article>
                            <strong>2. Настройка под объект</strong>
                            <p>Этажи, номера, планировки, фото, видео, цены и тексты.</p>
                        </article>

                        <article>
                            <strong>3. База данных и админка</strong>
                            <p>Бронирования, занятость, ручное заселение, отчёты и календарь.</p>
                        </article>

                        <article>
                            <strong>4. Размещение и запуск</strong>
                            <p>Установка на хостинг, домен, SSL, почта и Telegram-уведомления.</p>
                        </article>
                    </div>
                </section>
            </section>
        </main>
    );
}