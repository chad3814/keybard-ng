import * as React from "react";

import { Sidebar, SidebarContent, SidebarHeader, useSidebar } from "@/components/ui/sidebar";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export const DETAIL_SIDEBAR_WIDTH = "30rem";
const modifierOptions = ["Shift", "Ctrl", "Alt", "Gui"] as const;
const keyboardCategories = ["Numpad", "International", "Svalboard", "Special"] as const;

type DetailCategory = (typeof keyboardCategories)[number];

type KeyItem = {
    label: string;
    span?: number;
};

type SecondarySidebarProps = {
    activePanel: string | null;
    onClose: () => void;
};

const navClusterKeys: KeyItem[] = [
    { label: "PRINT SCREEN" },
    { label: "SCROLL LOCK" },
    { label: "PAUSE" },
    { label: "INSERT" },
    { label: "HOME" },
    { label: "PAGE UP" },
    { label: "DEL" },
    { label: "END" },
    { label: "PAGE DOWN" },
];

const numpadKeys: KeyItem[][] = [
    [{ label: "NUM LOCK" }, { label: "/" }, { label: "*" }, { label: "-" }],
    [{ label: "7" }, { label: "8" }, { label: "9" }, { label: "+" }],
    [{ label: "4" }, { label: "5" }, { label: "6" }, { label: "+" }],
    [{ label: "1" }, { label: "2" }, { label: "3" }, { label: "NUM ENTER" }],
    [{ label: "0", span: 2 }, { label: "." }, { label: "NUM ENTER" }],
];

const arrowCluster: KeyItem[][] = [[{ label: "UP" }], [{ label: "LEFT" }, { label: "DOWN" }, { label: "RIGHT" }]];

const SecondarySidebar: React.FC<SecondarySidebarProps> = ({ activePanel, onClose }) => {
    const primarySidebar = useSidebar("primary-nav", { defaultOpen: false });

    const [activeCategory, setActiveCategory] = React.useState<DetailCategory>("Numpad");
    const [activeModifiers, setActiveModifiers] = React.useState<string[]>([]);

    React.useEffect(() => {
        setActiveCategory("Numpad");
        setActiveModifiers([]);
    }, [activePanel]);

    const primaryOffset = primarySidebar.state === "collapsed" ? "calc(var(--sidebar-width-icon) + var(--spacing)*4)" : "calc(var(--sidebar-width-base) + var(--spacing)*4)";

    const handleModifierToggle = (modifier: string) => {
        setActiveModifiers((prev) => (prev.includes(modifier) ? prev.filter((item) => item !== modifier) : [...prev, modifier]));
    };

    const renderContent = () => {
        if (!activePanel) {
            return (
                <div className="grid place-items-center h-full text-center text-sm text-muted-foreground px-6">Select a menu item to view contextual actions and key groups.</div>
            );
        }

        if (activePanel === "keyboard") {
            return (
                <div className="space-y-6">
                    <section>
                        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-2">Modifiers</p>
                        <div className="flex flex-wrap gap-2">
                            {modifierOptions.map((modifier) => {
                                const isActive = activeModifiers.includes(modifier);
                                return (
                                    <Button
                                        key={modifier}
                                        type="button"
                                        variant={isActive ? "default" : "secondary"}
                                        size="sm"
                                        className={cn("rounded-full px-4", isActive ? "shadow" : "bg-muted")}
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
                            <div className="flex items-center justify-between w-full rounded-full bg-muted p-1">
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

                        {activeCategory === "Numpad" ? (
                            <div className="space-y-4">
                                <div className="grid grid-cols-3 gap-2">
                                    {navClusterKeys.map((key) => (
                                        <Keycap key={key.label} label={key.label} />
                                    ))}
                                </div>
                                <div className="flex flex-col gap-4 sm:flex-row">
                                    <div className="flex-1">
                                        <div className="grid grid-cols-4 gap-2">
                                            {numpadKeys.flat().map((key, index) => (
                                                <Keycap key={`${key.label}-${index}`} label={key.label} colSpan={key.span} />
                                            ))}
                                        </div>
                                    </div>
                                    <div className="w-full sm:w-auto sm:min-w-[6rem]">
                                        <div className="grid gap-2">
                                            {arrowCluster.map((row, rowIndex) => (
                                                <div key={rowIndex} className="grid grid-cols-3 gap-2">
                                                    {row.map((key) => (
                                                        <Keycap key={`${key.label}-${rowIndex}`} label={key.label} />
                                                    ))}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="rounded-lg border border-dashed border-muted-foreground/30 p-6 text-center text-sm text-muted-foreground">
                                {activeCategory} key groups are coming soon.
                            </div>
                        )}
                    </section>
                </div>
            );
        }

        return <div className="grid place-items-center h-full text-center text-sm text-muted-foreground px-6">{`Content for "${activePanel}" will appear here soon.`}</div>;
    };

    return (
        <Sidebar
            name="details-panel"
            defaultOpen={false}
            collapsible="offcanvas"
            hideGap
            className="z-8 bg-sidebar-background"
            style={
                {
                    left: primarySidebar.isMobile ? undefined : primaryOffset,
                    "--sidebar-width": DETAIL_SIDEBAR_WIDTH,
                } as React.CSSProperties
            }
        >
            <SidebarHeader className="px-4 py-6">
                <div className="flex items-center justify-between gap-4">
                    <div>
                        <h2 className="text-3xl font-semibold leading-none text-slate-700">{getPanelTitle(activePanel)}</h2>
                    </div>
                    <Button type="button" variant="ghost" size="icon" className="shrink-0" onClick={onClose} aria-label="Close details panel">
                        <X className="h-4 w-4" />
                    </Button>
                </div>
            </SidebarHeader>
            <SidebarContent className="p-4">{renderContent()}</SidebarContent>
        </Sidebar>
    );
};

const Keycap: React.FC<{ label: string; colSpan?: number }> = ({ label, colSpan = 1 }) => {
    const style = colSpan > 1 ? { gridColumn: `span ${colSpan} / span ${colSpan}` } : undefined;
    return (
        <div className={cn("rounded-md border border-sidebar-border bg-card px-2 py-2 text-center text-xs font-medium uppercase text-sidebar-foreground shadow-sm")} style={style}>
            {label}
        </div>
    );
};

const getPanelTitle = (panel: string | null) => {
    if (!panel) {
        return "Details";
    }

    switch (panel) {
        case "keyboard":
            return "Keyboard Keys";
        case "layers":
            return "Layer Details";
        case "tapdances":
            return "Tapdance Settings";
        case "macros":
            return "Macro Controls";
        case "qmk":
            return "QMK Keys";
        case "misc":
            return "Misc Keys";
        default:
            return "Details";
    }
};

export default SecondarySidebar;
