import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import InternationalKeyboard from "@/components/Keyboards/InternationalKeyboard";
import NumpadKeyboard from "@/components/Keyboards/NumpadKeyboard";
import QwertyKeyboard from "@/components/Keyboards/QwertyKeyboard";
import { cn } from "@/lib/utils";

const modifierOptions = ["Shift", "Ctrl", "Alt", "Gui"] as const;
const keyboardCategories = ["Numpad", "International", "Svalboard", "Special"] as const;
type DetailCategory = (typeof keyboardCategories)[number];

const BasicKeyboards = () => {
    const keyboardRef = useRef(null);
    const numpadKeyboardRef = useRef(null);
    const internationalKeyboardRef = useRef(null);
    const [activeCategory, setActiveCategory] = useState<DetailCategory>("Numpad");
    const [activeModifiers, setActiveModifiers] = useState<string[]>([]);

    useEffect(() => {
        setActiveCategory("Numpad");
        setActiveModifiers([]);
    }, []);

    const handleModifierToggle = (modifier: string) => {
        setActiveModifiers((prev) => (prev.includes(modifier) ? prev.filter((item) => item !== modifier) : [...prev, modifier]));
    };
    return (
        <div className="space-y-6">
            <QwertyKeyboard
                keyboardRef={keyboardRef}
                onChange={() => {
                    console.log("Input changed");
                }}
            />
            <section className="flex flex-row justify-around items-center">
                <p className="text-sm font-normal uppercase tracking-wide text-muted-foreground">Modifiers</p>
                <div className="flex flex-wrap gap-2">
                    {modifierOptions.map((modifier) => {
                        const isActive = activeModifiers.includes(modifier);
                        return (
                            <Button
                                key={modifier}
                                type="button"
                                variant={isActive ? "default" : "secondary"}
                                size="sm"
                                className={cn("rounded-full px-5", isActive ? "bg-kb-red" : "bg-muted", "hover:bg-kb-red hover:text-white hover:shadow-md transition")}
                                onClick={() => handleModifierToggle(modifier)}
                            >
                                {modifier.toUpperCase()}
                            </Button>
                        );
                    })}
                </div>
            </section>

            <section className="space-y-3">
                <div className="flex flex-wrap items-center justify-center gap-3">
                    <div className="flex items-center justify-between rounded-full p-1 gap-3 bg-muted/30">
                        {keyboardCategories.map((category) => {
                            const isActive = category === activeCategory;
                            return (
                                <Button
                                    key={category}
                                    type="button"
                                    size="sm"
                                    variant={isActive ? "default" : "ghost"}
                                    className={cn("px-3 py-1 text-xs rounded-full", isActive ? "shadow" : "text-muted-foreground")}
                                    onClick={() => setActiveCategory(category)}
                                >
                                    {category}
                                </Button>
                            );
                        })}
                    </div>
                </div>
                <div className="space-y-4">
                    {activeCategory === "Numpad" && <NumpadKeyboard keyboardRef={numpadKeyboardRef} onChange={() => console.log("Numpad input changed")} />}
                    {activeCategory === "International" && (
                        <InternationalKeyboard keyboardRef={internationalKeyboardRef} onChange={() => console.log("International keyboard input changed")} />
                    )}
                </div>
            </section>
        </div>
    );
};

export default BasicKeyboards;
