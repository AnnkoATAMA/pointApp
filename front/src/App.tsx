import { Route, Routes } from "react-router-dom";
import LoginPage from "./Pages/LoginPage.tsx";
import Welcome from "./Pages/Welcome.tsx";
import ProtectedRoute from "./ProtectRoute.tsx";

const App = () => {
    return (
        <Routes>
            <Route path="/signin" element={<LoginPage />} />
            <Route path="/" element={<ProtectedRoute><Welcome /></ProtectedRoute>} />
        </Routes>
    );
};

export default App;
