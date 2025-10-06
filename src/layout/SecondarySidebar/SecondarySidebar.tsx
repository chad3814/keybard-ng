import * as React from "react";

import { Sidebar, SidebarContent, SidebarHeader, useSidebar } from "@/components/ui/sidebar";

import BasicKeyboards from "./Panels/BasicKeyboards";
import { Button } from "@/components/ui/button";
import CombosPanel from "./Panels/CombosPanel";
import LayersPanel from "./Panels/LayersPanel";
import MacrosPanel from "./Panels/MacrosPanel";
import MiscKeysPanel from "./Panels/MiscKeysPanel/MiscKeysPanel";
import QmkKeysPanel from "./Panels/QmkKeysPanel";
import TapdancePanel from "./Panels/TapdancePanel";
import { X } from "lucide-react";

export const DETAIL_SIDEBAR_WIDTH = "32rem";

type KeyItem = {
    label: string;
    span?: number;
};

type SecondarySidebarProps = {
    activePanel: string | null;
    onClose: () => void;
};
const SecondarySidebar: React.FC<SecondarySidebarProps> = ({ activePanel, onClose }) => {
    const primarySidebar = useSidebar("primary-nav", { defaultOpen: false });
    const primaryOffset = primarySidebar.state === "collapsed" ? "calc(var(--sidebar-width-icon) + var(--spacing)*4)" : "calc(var(--sidebar-width-base) + var(--spacing)*4)";

    const renderContent = () => {
        if (!activePanel) {
            return (
                <div className="grid place-items-center h-full text-center text-sm text-muted-foreground px-6">Select a menu item to view contextual actions and key groups.</div>
            );
        }

        if (activePanel === "keyboard") return <BasicKeyboards />;
        if (activePanel === "layers") return <LayersPanel />;
        if (activePanel === "tapdances") return <TapdancePanel />;
        if (activePanel === "macros") return <MacrosPanel />;
        if (activePanel === "combos") return <CombosPanel />;
        if (activePanel === "qmk") return <QmkKeysPanel />;
        if (activePanel === "misc") return <MiscKeysPanel />;

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

const getPanelTitle = (panel: string | null) => {
    if (!panel) {
        return "Details";
    }

    switch (panel) {
        case "keyboard":
            return "Keyboard Keys";
        case "layers":
            return "Layers";
        case "tapdances":
            return "Tap Dances";
        case "macros":
            return "Macros";
        case "qmk":
            return "QMK Keys";
        case "misc":
            return "Misc Keys";
        case "combos":
            return "Combos";
        default:
            return "Details";
    }
};

export default SecondarySidebar;
