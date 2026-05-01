import { useNavigate, useParams } from "react-router-dom";
import {
    getHotelBySlug,
    getFloorByHotelAndNumber,
    getRoomsByFloorId,
} from "../data/selectors";
import "./floor-plan.css";

export default function FloorPlanScreen() {
    const { hotelSlug, floorNumber } = useParams();
    const navigate = useNavigate();

    const hotel = getHotelBySlug(hotelSlug);
    if (!hotel) return <div>Гостиница не найдена</div>;

    const floor = getFloorByHotelAndNumber(hotel.id, floorNumber);
    if (!floor) return <div>Этаж не найден</div>;

    const rooms = getRoomsByFloorId(floor.id);

    if (floor.type === "service") {
        return (
            <main className="floor-plan-screen">
                <button className="back-button" onClick={() => navigate(`/hotels/${hotelSlug}/floors`)}>
                    ← Назад к этажам
                </button>

                <section className="restaurant-view">
                    <div>
                        <p className="eyebrow">{floor.title}</p>
                        <h1>Ресторан / зона питания</h1>
                        <p>
                            На первом этаже расположен ресторан. Здесь можно выбрать питание
                            при проживании или оставить заявку на бронирование столика.
                        </p>

                        <button className="primary-button">
                            Забронировать столик
                        </button>
                    </div>
                </section>
            </main>
        );
    }

    const oddRooms = rooms.filter((room) => Number(room.number) % 2 !== 0);
    const evenRooms = rooms.filter((room) => Number(room.number) % 2 === 0);

    return (
        <main className="floor-plan-screen">
            <button className="back-button" onClick={() => navigate(`/hotels/${hotelSlug}/floors`)}>
                ← Назад к этажам
            </button>

            <header className="floor-plan-header">
                <p className="eyebrow">{hotel.name}</p>
                <h1>{floor.title}</h1>
                <p>{floor.description}</p>
            </header>

            <section className="floor-layout-horizontal">
                <div className="rooms-row">
                    {oddRooms.map((room) => (
                        <button
                            key={room.id}
                            className="room-tile-horizontal"
                            onClick={() =>
                                navigate(`/hotels/${hotelSlug}/rooms/${room.number}`)
                            }
                        >
                            {room.number}
                        </button>
                    ))}
                </div>

                <div className="corridor-horizontal">
                    <span>Коридор</span>
                    <button className="stairs">Лестница вниз</button>
                    {floor.number === 3 && <span className="balcony-horizontal">Балконы</span>}
                </div>

                <div className="rooms-row">
                    {evenRooms.map((room) => (
                        <button key={room.id} className="room-tile-horizontal">
                            {room.number}
                        </button>
                    ))}
                </div>
            </section>
        </main>
    );
}