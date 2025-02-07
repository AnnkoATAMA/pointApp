import { Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/LoginPage.tsx";
import Welcome from "./Pages/Welcome.tsx";
import ProtectedRoute from "./ProtectRoute.tsx";
import AdminPage from "./Pages/AdminPage.tsx";

const App = () => {
    return (
        <Routes>
            <Route path="/signin" element={<LoginPage />} />
            <Route path="/" element={<ProtectedRoute><Welcome /></ProtectedRoute>} />
            <Route path="/admin" element={<ProtectedRoute><AdminPage /></ProtectedRoute>} />
        </Routes>
    );
};

export default App;
