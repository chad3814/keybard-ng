import "./Key.css";

import React from "react";
import { UNIT_SIZE } from "../constants/svalboard-layout";

interface KeyProps {
    x: number; // X position in key units
    y: number; // Y position in key units
    w: number; // Width in key units
    h: number; // Height in key units
    keycode: string; // The keycode (e.g., "KC_A", "MO(2)")
    label: string; // Display label for the key
    row: number; // Matrix row
    col: number; // Matrix column
    selected?: boolean;
    onClick?: (row: number, col: number) => void;
}

export const Key: React.FC<KeyProps> = ({ x, y, w, h, keycode, label, row, col, selected = false, onClick }) => {
    const handleClick = () => {
        if (onClick) {
            onClick(row, col);
        }
    };

    // Convert key units to pixels
    const style: React.CSSProperties = {
        left: `${x * UNIT_SIZE}px`,
        top: `${y * UNIT_SIZE}px`,
        width: `${w * UNIT_SIZE}px`,
        height: `${h * UNIT_SIZE}px`,
    };

    return (
        <div className="absolute top-0 left-0">
            <div
                className={`
                    absolute bg-kb-primary flex items-center justify-center cursor-pointer transition-all duration-200 ease-in-out rounded-md font-semibold
                    ${selected ? "border-2 border-kb-gray bg-red-500" : "border-2 border-kb-gray hover:border-red-500"}
                  `}
                style={style}
                onClick={handleClick}
                data-keycode={keycode}
                data-row={row}
                data-col={col}
                title={keycode}
            >
                <span className="text-white text-lg">{label}</span>
            </div>
        </div>
    );
};
