import { createTheme, PaletteMode, Theme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const persona3Theme = (mode: PaletteMode): Theme => createTheme({
    palette: {
        mode,
        primary: { main: "#4fc3f7" },
        secondary: { main: "#82eaff" },
        background: { default: "#0f172a", paper: "rgba(20, 30, 50, 0.9)" },
        text: { primary: "#d0d7e5", secondary: "#82eaff" },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    fontWeight: "bold",
                    borderRadius: "8px",
                    textTransform: "none",
                    transition: "all 0.3s ease-in-out",
                    "&:hover": { background: "#82eaff" },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    background: "rgba(20, 30, 50, 0.8)",
                    color: "#fff",
                    border: "1px solid #4fc3f7",
                    boxShadow: "0 0 15px #4fc3f7",
                    transition: "transform 0.3s ease-in-out",
                    "&:hover": {
                        transform: "scale(1.02)",
                        boxShadow: "0 0 20px #82eaff",
                    },
                },
            },
        },
    },
});

const persona4Theme = (mode: PaletteMode): Theme => createTheme({
    palette: {
        mode,
        primary: { main: "#ffc107" },
        secondary: { main: "#c11d1d" },
        background: { default: "#faf3e0", paper: "#faf3e8" },
        text: { primary: "#3e2723", secondary: "#d84315" },
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    fontWeight: "bold",
                    borderRadius: "8px",
                    textTransform: "none",
                    transition: "all 0.3s ease-in-out",
                    "&:hover": { background: "#ffea00" },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    background: "#FFF8E1",
                    color: "#3e2723",
                    border: "1px solid #FFC107",
                    boxShadow: "0 0 15px #ffea00",
                    transition: "transform 0.3s ease-in-out",
                    "&:hover": {
                        transform: "scale(1.02)",
                        boxShadow: "0 0 20px #ffea00",
                    },
                },
            },
        },
    },
});

export const usePersonaTheme = (): Theme => {
    const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
    return prefersDarkMode ? persona3Theme("dark") : persona4Theme("light");
};
