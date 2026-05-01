import { useNavigate, useParams } from "react-router-dom";
import { getHotelBySlug, getFloorsByHotelId } from "../data/selectors";
import "./floor.css";

export default function FloorSelectScreen() {
    const { hotelSlug } = useParams();
    const navigate = useNavigate();

    const hotel = getHotelBySlug(hotelSlug);
    if (!hotel) return <div>Гостиница не найдена</div>;

    const floors = getFloorsByHotelId(hotel.id).sort((a, b) => b.number - a.number);

    return (
        <main className="floor-screen">
            <header className="floor-header">
                <button className="back-button" onClick={() => navigate(`/hotels/${hotelSlug}`)}>
                    ← Назад
                </button>

                <div>
                    <h1>{hotel.name}</h1>
                    <p>Выберите этаж</p>
                </div>
            </header>

            <section className="building-stack">
                {floors.map((floor) => (
                    <button
                        key={floor.id}
                        className={`floor-level floor-level-${floor.number}`}
                        style={{
                            backgroundImage: floor.backgroundImage
                                ? `linear-gradient(rgba(15, 23, 42, 0.35), rgba(15, 23, 42, 0.55)), url(${floor.backgroundImage})`
                                : "linear-gradient(135deg, #38bdf8, #60a5fa)",
                        }}
                        onClick={() => navigate(`/hotels/${hotelSlug}/floors/${floor.number}`)}
                    >
                        <span className="floor-number">{floor.number}</span>

                        <span className="floor-info">
                            <strong>{floor.title}</strong>
                            <small>{floor.description}</small>
                        </span>
                    </button>
                ))}
            </section>
        </main>
    );
}