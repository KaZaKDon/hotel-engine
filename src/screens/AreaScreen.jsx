import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAreaBySlug, getHotelBySlug } from "../data/selectors";
import "./area.css";

export default function AreaScreen() {
    const navigate = useNavigate();
    const { hotelSlug, areaSlug } = useParams();

    const [imageIndex, setImageIndex] = useState(0);
    const [galleryOpen, setGalleryOpen] = useState(false);
    const [videoOpen, setVideoOpen] = useState(false);

    const hotel = getHotelBySlug(hotelSlug);
    const area = getAreaBySlug(hotel?.id, areaSlug);

    if (!hotel || !area) {
        return (
            <main className="screen area-screen">
                <button className="back-button" onClick={() => navigate(-1)}>
                    ← Назад
                </button>
                <p>Зона не найдена</p>
            </main>
        );
    }

    const images = area.media?.images || [];
    const currentImage = images[imageIndex] || images[0];
    const hasVideo = Boolean(area.media?.video);

    const showPrevImage = () => {
        setImageIndex((current) => (current - 1 + images.length) % images.length);
    };

    const showNextImage = () => {
        setImageIndex((current) => (current + 1) % images.length);
    };

    return (
        <main className="screen area-screen">
            <button className="back-button" onClick={() => navigate(-1)}>
                ← Назад
            </button>

            <section className="area-header">
                <h1>{area.title}</h1>
                <p>{area.description}</p>
            </section>

            <section className="area-content">
                <div className="area-plan">
                    <h2>План зала</h2>

                    <div className="area-plan-box">
                        <svg
                            className="area-plan-svg"
                            viewBox="0 0 600 420"
                            role="img"
                            aria-label="План зала со столами"
                        >
                            <rect className="area-room-fill" x="20" y="20" width="560" height="380" rx="18" />
                            <rect className="area-room-border" x="20" y="20" width="560" height="380" rx="18" />

                            {/* окна по нижней стене */}
                            <rect className="area-window" x="90" y="390" width="90" height="20" rx="4" />
                            <rect className="area-window" x="255" y="390" width="90" height="20" rx="4" />
                            <rect className="area-window" x="420" y="390" width="90" height="20" rx="4" />

                            {/* вход справа */}
                            <path className="area-door-arc" d="M570 200 A70 70 1 0 0 500 270" />

                            <rect
                                className="area-door-gap"
                                x="570"
                                y="100"
                                width="16"
                                height="90"
                                rx="8"
                            />

                            <text
                                className="area-door-label"
                                x="550"
                                y="150"
                                textAnchor="end"
                            >
                                Вход
                            </text>

                            {/* столы */}
                            <rect className="area-table" x="90" y="85" width="100" height="58" rx="16" />
                            <rect className="area-table" x="90" y="180" width="100" height="58" rx="16" />
                            <rect className="area-table" x="90" y="275" width="100" height="58" rx="16" />

                            <rect className="area-table" x="370" y="85" width="100" height="58" rx="16" />
                            <rect className="area-table" x="370" y="180" width="100" height="58" rx="16" />
                            <rect className="area-table" x="370" y="275" width="100" height="58" rx="16" />
                        </svg>
                    </div>
                </div>

                <div className="area-media">
                    <h2>Фото и видео</h2>

                    {currentImage ? (
                        <button
                            type="button"
                            className="area-photo-preview"
                            onClick={() => setGalleryOpen(true)}
                        >
                            <img src={currentImage} alt={area.title} />

                            {images.length > 1 && (
                                <span className="area-photo-badge">
                                    Фото {imageIndex + 1} / {images.length}
                                </span>
                            )}
                        </button>
                    ) : (
                        <div className="area-empty">Нет фото</div>
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
                </div>
            </section>

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
                            alt={`${area.title} фото ${imageIndex + 1}`}
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

            {videoOpen && hasVideo && (
                <div className="modal" onClick={() => setVideoOpen(false)}>
                    <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
                        <button
                            type="button"
                            className="modal-close"
                            onClick={() => setVideoOpen(false)}
                        >
                            ×
                        </button>

                        <video
                            className="area-video"
                            controls
                            autoPlay
                            playsInline
                            src={area.media.video}
                        />
                    </div>
                </div>
            )}
        </main>
    );
}