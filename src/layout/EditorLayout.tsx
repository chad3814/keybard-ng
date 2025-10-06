import * as React from "react";

import AppSidebar, { SidebarItem } from "./Sidebar";
import SecondarySidebar, { DETAIL_SIDEBAR_WIDTH } from "./SecondarySidebar/SecondarySidebar";
import { SidebarProvider, useSidebar } from "@/components/ui/sidebar";

import { Keyboard } from "@/components/Keyboard";
import LayerSelector from "./LayerSelector";
import { cn } from "@/lib/utils";
import { useVial } from "@/contexts/VialContext";

const EditorLayout = () => {
    return (
        <SidebarProvider defaultOpen={false}>
            <EditorLayoutInner />
        </SidebarProvider>
    );
};

const EditorLayoutInner = () => {
    const { keyboard } = useVial();
    const [selectedLayer, setSelectedLayer] = React.useState(0);
    const [activePanel, setActivePanel] = React.useState<string | null>(null);

    const primarySidebar = useSidebar("primary-nav", { defaultOpen: false });
    const detailsSidebar = useSidebar("details-panel", { defaultOpen: false });
    const { isMobile, open: detailsOpen, state: detailsState, setOpen, setOpenMobile } = useSidebar("details-panel", { defaultOpen: false });

    const openDetails = React.useCallback(() => {
        if (isMobile) {
            setOpenMobile(true);
        } else {
            setOpen(true);
        }
    }, [isMobile, setOpen, setOpenMobile]);

    const closeDetails = React.useCallback(() => {
        if (isMobile) {
            setOpenMobile(false);
        } else {
            setOpen(false);
        }
    }, [isMobile, setOpen, setOpenMobile]);

    React.useEffect(() => {
        if (activePanel && !detailsOpen) {
            openDetails();
        }

        if (!activePanel && detailsOpen) {
            closeDetails();
        }
    }, [activePanel, detailsOpen, openDetails, closeDetails]);

    const handleItemSelect = React.useCallback(
        (item: SidebarItem) => {
            setActivePanel(item.url);
            openDetails();
        },
        [openDetails]
    );

    const handleCloseDetails = React.useCallback(() => {
        closeDetails();
        setActivePanel(null);
    }, [closeDetails]);

    const primaryOffset = primarySidebar.isMobile ? undefined : primarySidebar.state === "collapsed" ? "var(--sidebar-width-icon)" : "var(--sidebar-width-base)";
    const showDetailsSidebar = !isMobile && detailsState === "expanded";
    const contentOffset = showDetailsSidebar ? `calc(${primaryOffset ?? "0px"} + ${DETAIL_SIDEBAR_WIDTH})` : primaryOffset ?? undefined;
    const contentStyle = React.useMemo<React.CSSProperties>(
        () => ({
            marginLeft: contentOffset,
            transition: "margin-left 320ms cubic-bezier(0.22, 1, 0.36, 1)",
            willChange: "margin-left",
        }),
        [contentOffset]
    );

    return (
        <div className={cn("flex h-screen max-w-screen p-0", showDetailsSidebar && "bg-white")}>
            <AppSidebar activeItem={activePanel} onItemSelect={handleItemSelect} detailsSidebar={detailsSidebar} />
            {activePanel && <SecondarySidebar activePanel={activePanel} onClose={handleCloseDetails} />}
            <div className="flex-1 px-4 h-screen max-h-screen flex flex-col max-w-full w-full overflow-hidden bg-kb-gray" style={contentStyle}>
                <LayerSelector selectedLayer={selectedLayer} setSelectedLayer={setSelectedLayer} />
                <div className="flex-1 overflow-auto flex items-center overflow-x-auto max-w-full">
                    <Keyboard keyboard={keyboard!} selectedLayer={selectedLayer} setSelectedLayer={setSelectedLayer} />
                </div>
            </div>
        </div>
    );
};

export default EditorLayout;
