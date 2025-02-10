import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import DigitalClock from "./DigitalClock.tsx";

const GREEK_NUMBERS = ["Ⅰ", "Ⅱ", "Ⅲ", "Ⅳ", "Ⅴ", "Ⅵ", "Ⅶ", "Ⅷ", "Ⅸ", "Ⅹ", "Ⅺ", "Ⅻ"];
const PAGE_LINKS = ["/home", "/ranking", "/", "/", "/", "/", "/", "/", "/", "/", "/", "/"];

const MOON_PHASES = ["🌑", "🌒", "🌓", "🌔", "🌕", "🌖", "🌗", "🌘"];

const Clock: React.FC = () => {
    const [time, setTime] = useState(new Date());
    const [moonPhase, setMoonPhase] = useState("🌑");
    const navigate = useNavigate();
    const theme = useTheme();

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Tokyo" })));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const moonIndex = Math.floor(((time.getDate() % 29) / 29) * 8);
        setMoonPhase(MOON_PHASES[moonIndex]);
    }, [time]);

    const handleNumberClick = (index: number) => {
        const path = PAGE_LINKS[index];
        if (path) navigate(path);
    };

    const radius = 50;
    const centerX = 50;
    const centerY = 50;

    const isDaytime = time.getHours() >= 6 && time.getHours() < 18;
    const dayNightIcon = isDaytime ? "☀" : moonPhase;

    return (
        <div style={{ width: "100%", maxWidth: "800px", margin: "0 auto" }}>
            <svg viewBox="0 0 100 100" style={{ width: "100%", height: "auto" }}>
                <circle
                    cx={centerX}
                    cy={centerY}
                    r={radius - 1}
                    fill={theme.palette.background.paper}
                    stroke={theme.palette.primary.main}
                    strokeWidth="1"
                />
                {GREEK_NUMBERS.map((number, index) => {
                    const angle = ((index / 12) * 360 - 90) * (Math.PI / 180);
                    const x = centerX + Math.cos(angle) * (radius - 12);
                    const y = centerY + Math.sin(angle) * (radius - 12) + 2;

                    return (
                        <text
                            key={index} x={x} y={y} fill={theme.palette.text.primary} fontSize="8" textAnchor="middle" fontFamily="serif"
                            style={{
                                cursor: "pointer",
                                transition: "fill 0.2s ease-in-out",
                            }}
                            onClick={() => handleNumberClick(index)}
                            onMouseOver={(e) => (e.currentTarget.style.fill = theme.palette.secondary.main)}
                            onMouseOut={(e) => (e.currentTarget.style.fill = theme.palette.text.primary)}
                        >
                            {number}
                        </text>
                    );
                })}
                <circle cx={centerX} cy={centerY} r={radius - 22} fill="transparent" stroke={theme.palette.secondary.main} strokeWidth="0.5"/>
                <line x1={centerX} y1={centerY} x2={centerX} y2={centerY - 16} stroke="white" strokeWidth="2"
                      transform={`rotate(${((time.getHours() % 12) / 12) * 360 + (time.getMinutes() / 60) * 30}, ${centerX}, ${centerY})`}/>
                <line x1={centerX} y1={centerY} x2={centerX} y2={centerY - 28} stroke="cyan" strokeWidth="1.5"
                      transform={`rotate(${(time.getMinutes() / 60) * 360 + (time.getSeconds() / 60) * 6}, ${centerX}, ${centerY})`}/>
                <line x1={centerX} y1={centerY} x2={centerX} y2={centerY - 40} stroke="red" strokeWidth="1"
                      transform={`rotate(${(time.getSeconds() / 60) * 360}, ${centerX}, ${centerY})`}/>
                <circle cx={centerX} cy={centerY} r="1.5" fill="white"/>
                <text x={centerX} y={centerY - 10} fill={theme.palette.secondary.main} fontSize="8" textAnchor="middle">
                    {dayNightIcon}
                </text>
            </svg>
            <DigitalClock />
        </div>
    );
};

export default Clock;
