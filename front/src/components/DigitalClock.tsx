import React, { useEffect, useState } from "react";

const SEGMENTS: Record<string, boolean[]> = {
    "0": [true, true, true, true, true, true, false],
    "1": [false, true, true, false, false, false, false],
    "2": [true, true, false, true, true, false, true],
    "3": [true, true, true, true, false, false, true],
    "4": [false, true, true, false, false, true, true],
    "5": [true, false, true, true, false, true, true],
    "6": [true, false, true, true, true, true, true],
    "7": [true, true, true, false, false, false, false],
    "8": [true, true, true, true, true, true, true],
    "9": [true, true, true, true, false, true, true],
};


type SevenSegmentProps = {
    digit: string;
};

const SevenSegment: React.FC<SevenSegmentProps> = ({ digit }) => {
    const segments = SEGMENTS[digit] || [false, false, false, false, false, false, false];
    return (
        <svg width="50" height="70" viewBox="0 0 50 70">
            <polygon points="10, 8  14, 12 30, 12 34, 8 30, 4  14, 4" fill={segments[0] ? "red" : "#444"}/>
            <polygon points="36, 10 32, 14 32, 30 36, 34 40, 30 40, 14" fill={segments[1] ? "red" : "#444"}/>
            <polygon points="36, 38 32, 42 32, 58 36, 62 40, 58 40, 42" fill={segments[2] ? "red" : "#444"}/>
            <polygon points="10, 64 14, 68 30, 68 34, 64 30, 60 14, 60" fill={segments[3] ? "red" : "#444"}/>
            <polygon points=" 8, 38  4, 42  4, 58  8, 62 12, 58 12, 42" fill={segments[4] ? "red" : "#444"}/>
            <polygon points=" 8, 10  4, 14  4, 30  8, 34 12, 30 12, 14" fill={segments[5] ? "red" : "#444"}/>
            <polygon points="10, 36 14, 40 30, 40 34, 36 30, 32 14, 32" fill={segments[6] ? "red" : "#444"}/>
        </svg>
    );
};

const DigitalClock: React.FC = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const hours = time.getHours().toString().padStart(2, "0");
    const minutes = time.getMinutes().toString().padStart(2, "0");
    const seconds = time.getSeconds().toString().padStart(2, "0");

    return (
        <div style={{display: "flex",gap:"5px", justifyContent: "center", alignItems: "center"}}>
            <SevenSegment digit={hours[0]} />
            <SevenSegment digit={hours[1]} />
            <span style={{ fontSize: "50px", color: "red" }}>:</span>
            <SevenSegment digit={minutes[0]} />
            <SevenSegment digit={minutes[1]} />
            <span style={{ fontSize: "50px", color: "red" }}>:</span>
            <SevenSegment digit={seconds[0]} />
            <SevenSegment digit={seconds[1]} />
        </div>
    );
};

export default DigitalClock;
