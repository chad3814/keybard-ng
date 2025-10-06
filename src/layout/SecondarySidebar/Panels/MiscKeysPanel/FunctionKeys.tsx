import Keyboard, { KeyboardOptions } from "react-simple-keyboard";

import { commonKeyboardOptions } from "@/shared/CommonKeyboardOptions";
import { useRef } from "react";

const FunctionKeys = () => {
    const functionKeysRef = useRef(null);
    const keyboardOptions: KeyboardOptions = {
        ...commonKeyboardOptions,
        /**
         * Layout by:
         * Sterling Butters (https://github.com/SterlingButters)
         */
        layout: {
            default: [
                "{KC_F1} {KC_F2} {KC_F3} {KC_F4} {KC_F5} {KC_F6} {KC_F7} {KC_F8} {KC_F9} {KC_F10} {KC_F11} {KC_F12}",
                "{KC_13} {KC_14} {KC_15} {KC_16} {KC_17} {KC_18} {KC_19} {KC_20} {KC_21}",
                "{KC_22} {KC_23} {KC_24}",
            ],
            shift: [
                "{KC_F1} {KC_F2} {KC_F3} {KC_F4} {KC_F5} {KC_F6} {KC_F7} {KC_F8} {KC_F9} {KC_F10} {KC_F11} {KC_F12}",
                "{KC_13} {KC_14} {KC_15} {KC_16} {KC_17} {KC_18} {KC_19} {KC_20} {KC_21}",
                "{KC_22} {KC_23} {KC_24}",
            ],
        },
        display: {
            "{KC_F1}": "F1",
            "{KC_F2}": "F2",
            "{KC_F3}": "F3",
            "{KC_F4}": "F4",
            "{KC_F5}": "F5",
            "{KC_F6}": "F6",
            "{KC_F7}": "F7",
            "{KC_F8}": "F8",
            "{KC_F9}": "F9",
            "{KC_F10}": "F10",
            "{KC_F11}": "F11",
            "{KC_F12}": "F12",
            "{KC_13}": "F13",
            "{KC_14}": "F14",
            "{KC_15}": "F15",
            "{KC_16}": "F16",
            "{KC_17}": "F17",
            "{KC_18}": "F18",
            "{KC_19}": "F19",
            "{KC_20}": "F20",
            "{KC_21}": "F21",
            "{KC_22}": "F22",
            "{KC_23}": "F23",
            "{KC_24}": "F24",
        },
    };
    return (
        <div>
            <span className="font-semibold text-lg text-slate-700">All function keys</span>
            <Keyboard ref={(r: any) => (functionKeysRef.current = r)} layoutName="default" {...keyboardOptions} />
        </div>
    );
};

export default FunctionKeys;
