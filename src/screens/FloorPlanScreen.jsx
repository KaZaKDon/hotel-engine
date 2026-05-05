import { useNavigate, useParams } from "react-router-dom";
import { getFloorByNumber, getHotelBySlug, getRoomsByFloor } from "../data/selectors";
import "./floor-plan.css";

export default function FloorPlanScreen() {
    const navigate = useNavigate();
    const { hotelSlug, floorNumber } = useParams();

    const hotel = getHotelBySlug(hotelSlug);
    const floor = getFloorByNumber(hotel?.id, Number(floorNumber));
    const rooms = getRoomsByFloor(floor?.id);

    if (!hotel || !floor) {
        return (
            <main className="screen">
                <button className="back-button" onClick={() => navigate(-1)}>
                    ← Назад
                </button>
                <p>Этаж не найден</p>
            </main>
        );
    }

    const layoutItems = floor.layout?.items || [];
    const layoutZones = floor.layout?.zones || [];
    const layoutFurniture = floor.layout?.furniture || [];

    const handleItemClick = (item) => {
        if (item.type === "room") {
            const room = rooms.find((roomItem) => roomItem.number === item.number);
            if (!room) return;

            navigate(`/hotels/${hotelSlug}/rooms/${room.number}`);
            return;
        }

        if (item.areaSlug) {
                navigate(`/hotels/${hotelSlug}/areas/${item.areaSlug}`);
                return;
            }

        if (item.type === "stairs") {
            const currentFloor = Number(floorNumber);

            if (item.direction === "up") {
                navigate(`/hotels/${hotelSlug}/floors/${currentFloor + 1}`);
                return;
            }

            if (item.direction === "down") {
                navigate(`/hotels/${hotelSlug}/floors/${currentFloor - 1}`);
            }
        }
    };

    const renderItemLabel = (item) => {
        if (item.type === "room") return item.number;
        if (item.type === "stairs") return item.title || "Лестница";
        return item.title;
    };

    return (
        <main className="screen floor-plan-screen">
            <button className="back-button" onClick={() => navigate(`/hotels/${hotelSlug}/floors`)}>
                ← К этажам
            </button>

            <section className="floor-plan-header">
                <h1>{floor.title}</h1>
            </section>

            <section className={`floor-layout floor-layout-${floor.number}`}>
                {layoutZones.map((zone) => (
                    <button
                        key={zone.id}
                        type="button"
                        className={`floor-zone floor-zone-${zone.type} ${zone.areaSlug ? "floor-zone-clickable" : ""}`}
                        style={{
                            left: `${zone.x}%`,
                            top: `${zone.y}%`,
                            width: `${zone.w}%`,
                            height: `${zone.h}%`,
                        }}
                        onClick={() => handleItemClick(zone)}
                        disabled={!zone.areaSlug}
                    >
                        <span>{zone.title}</span>
                    </button>
                ))}

                {layoutItems.map((item) => (
                    <button
                        key={item.id}
                        type="button"
                        className={`floor-item floor-item-${item.type}`}
                        style={{
                            left: `${item.x}%`,
                            top: `${item.y}%`,
                            width: `${item.w}%`,
                            height: `${item.h}%`,
                        }}
                        onClick={() => handleItemClick(item)}
                        disabled={item.type !== "room" && item.type !== "stairs"}
                    >
                        {renderItemLabel(item)}
                    </button>
                ))}

                {layoutFurniture.map((item) => (
                    <div
                        key={item.id}
                        className={`floor-furniture floor-furniture-${item.type}`}
                        style={{
                            left: `${item.x}%`,
                            top: `${item.y}%`,
                        }}
                    >
                        {item.title}
                    </div>
                ))}
            </section>
        </main>
    );
}