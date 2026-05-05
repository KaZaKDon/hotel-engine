import { furnitureCatalog } from "../data/furniture.catalog";
import "./room-plan.css";

const furnitureClassMap = {
    bed_single: "furniture-bed",
    bed_double: "furniture-bed",
    nightstand: "furniture-nightstand",
    wardrobe: "furniture-wardrobe",
    fridge: "furniture-fridge",
    table: "furniture-table",
    chair: "furniture-chair",
    tv: "furniture-tv",
    mirror: "furniture-mirror",
    bathroom: "furniture-bathroom",
    tv_stand: "furniture-tv-stand",
};

export default function RoomPlan({ room, selectedBedId, onSelectBed }) {
    const planWidth = room.plan?.width || 600;
    const planHeight = room.plan?.height || 450;
    const furniture = room.furniture || [];

    return (
        <div className="room-plan-box">
            <svg viewBox={`0 0 ${planWidth} ${planHeight}`} width="100%" height="100%">
                <rect
                    x="0"
                    y="0"
                    width={planWidth}
                    height={planHeight}
                    rx="18"
                    className="room-floor"
                />

                <rect
                    x="8"
                    y="8"
                    width={planWidth - 16}
                    height={planHeight - 16}
                    rx="14"
                    className="room-wall"
                />

                <path d="M 260 442 L 350 442" className="room-door-gap" />
                <path d="M 260 442 Q 260 385 320 385" className="room-door-arc" />

                <line
                    x1="20"
                    y1="8"
                    x2={planWidth - 20}
                    y2="8"
                    className="room-window"
                />

                {furniture.map((item) => {
                    const catalogItem = furnitureCatalog[item.type];

                    if (!catalogItem) return null;

                    const width = item.width || catalogItem.width;
                    const height = item.height || catalogItem.height;
                    const rotation = item.rotation || 0;
                    const className = furnitureClassMap[item.type] || "furniture-default";
                    const isBed =
                        item.type === "bed_single" || item.type === "bed_double";

                    return (
                        <g
                            key={item.id}
                            onClick={() =>
                                isBed &&
                                onSelectBed(selectedBedId === item.id ? null : item.id)
                            }
                            className={isBed ? "bed-clickable" : ""}
                            transform={`rotate(${rotation} ${item.x + width / 2} ${item.y + height / 2
                                })`}
                        >
                            <rect
                                x={item.x}
                                y={item.y}
                                width={width}
                                height={height}
                                rx="8"
                                className={`furniture-item ${className} ${selectedBedId === item.id ? "bed-active" : ""
                                    }`}
                            />

                            {(item.type === "bed_single" || item.type === "bed_double") && (
                                <rect
                                    x={item.x + 10}
                                    y={item.y + 10}
                                    width={width - 20}
                                    height="38"
                                    rx="6"
                                    className="bed-pillow"
                                />
                            )}

                            <text
                                x={item.x + width / 2}
                                y={item.y + height / 2}
                                textAnchor="middle"
                                dominantBaseline="middle"
                                className={
                                    item.type === "tv"
                                        ? "furniture-label furniture-label-light"
                                        : "furniture-label"
                                }
                            >
                                {catalogItem.title}
                            </text>
                        </g>
                    );
                })}
            </svg>
        </div>
    );
}