import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {usePersonaTheme} from "./theme";
import LoginPage from "./Pages/LoginPage.tsx";
import ProtectedRoute from "./ProtectRoute.tsx";
import AdminPage from "./Pages/AdminPage.tsx";
import PointPage from "./Pages/PointPage.tsx";
import RankingPage from "./Pages/RankingPage.tsx";
import Header from "./components/layout/Header.tsx";
import HomePage from "./Pages/HomePage.tsx";

const App = () => {
    const theme = usePersonaTheme();
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Header />
            <Routes>
                <Route path="/signin" element={<LoginPage />} />
                <Route path="/" element={<ProtectedRoute><PointPage /></ProtectedRoute>} />
                <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
                <Route path="/ranking" element={<ProtectedRoute><RankingPage /></ProtectedRoute>} />
                <Route path="/admin" element={<ProtectedRoute><AdminPage /></ProtectedRoute>} />
            </Routes>
        </ThemeProvider>
    );
};

export default App;
