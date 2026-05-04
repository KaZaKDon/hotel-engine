import { Routes, Route, Navigate } from "react-router-dom";
import { db } from "../data/hotel.config";
import HotelHeroScreen from "../screens/HotelHeroScreen";
import FloorSelectScreen from "../screens/FloorSelectScreen";
import FloorPlanScreen from "../screens/FloorPlanScreen";
import RoomScreen from "../screens/RoomScreen";
import AdminScreen from "../screens/AdminScreen";

export default function App() {
    const defaultHotel = db.hotels[0];

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <Navigate to={`/hotels/${defaultHotel.slug}`} replace />
                }
            />

            <Route path="/hotels/:hotelSlug" element={<HotelHeroScreen />} />
            <Route path="/hotels/:hotelSlug/floors" element={<FloorSelectScreen />} />
            <Route
                path="/hotels/:hotelSlug/rooms/:roomNumber"
                element={<RoomScreen />}
            />
            
            {/* заглушка под следующий шаг */}
            <Route
                path="/hotels/:hotelSlug/floors/:floorNumber"
                element={<FloorPlanScreen />}
            />
            <Route path="/admin" element={<AdminScreen />} />
        </Routes>
    );
}