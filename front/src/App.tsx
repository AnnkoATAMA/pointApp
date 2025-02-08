import { Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/LoginPage.tsx";
import ProtectedRoute from "./ProtectRoute.tsx";
import AdminPage from "./Pages/AdminPage.tsx";
import PointPage from "./Pages/PointPage.tsx";
import RankingPage from "./Pages/RankingPage.tsx";

const App = () => {
    return (
        <Routes>
            <Route path="/signin" element={<LoginPage />} />
            <Route path="/" element={<ProtectedRoute><PointPage /></ProtectedRoute>} />
            <Route path="/ranking" element={<ProtectedRoute><RankingPage /></ProtectedRoute>} />
            <Route path="/admin" element={<ProtectedRoute><AdminPage /></ProtectedRoute>} />
        </Routes>
    );
};

export default App;
