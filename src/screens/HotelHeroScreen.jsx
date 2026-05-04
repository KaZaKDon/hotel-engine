import { useNavigate, useParams } from "react-router-dom";
import { getHotelBySlug } from "../data/selectors";
import "./hero.css";

export default function HotelHeroScreen() {
    const { hotelSlug } = useParams();
    const navigate = useNavigate();

    const hotel = getHotelBySlug(hotelSlug);

    if (!hotel) return <div>Гостиница не найдена</div>;

    const { hero } = hotel;
    if (!hero) return <div>Hero не настроен</div>;

    return (
        <section
            className="hero"
            style={{ backgroundImage: `url(${hero.backgroundImage})` }}
        >
            <div className="hero-overlay" />
            <button
                className="admin-entry"
                onClick={() => navigate("/admin")}
                title="Админ панель (демо)"
            >
                <span>⚙</span>
            </button>

            <div className="hero-content">
                <h1>{hero.title}</h1>
                <p className="hero-subtitle">{hero.subtitle}</p>

                <div className="hero-badges">
                    {hero.badges.map((b) => (
                        <span key={b} className="badge">
                            {b}
                        </span>
                    ))}
                </div>

                <button
                    className="hero-button"
                    onClick={() => navigate(`/hotels/${hotelSlug}/floors`)}
                >
                    {hero.actionText}
                </button>
            </div>
        </section>
    );
}