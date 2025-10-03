import AppSidebar from "./Sidebar";
import { Keyboard } from "@/components/Keyboard";
import LayerSelector from "./LayerSelector";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useState } from "react";
import { useVial } from "@/contexts/VialContext";

const EditorLayout = () => {
    const { keyboard } = useVial();
    const [selectedLayer, setSelectedLayer] = useState(0);

    return (
        <SidebarProvider defaultOpen={false}>
            <div className="flex h-screen max-w-screen p-0">
                <AppSidebar />
                <div className="flex-1 px-4 h-screen max-h-screen flex flex-col max-w-full w-full overflow-hidden">
                    <LayerSelector selectedLayer={selectedLayer} setSelectedLayer={setSelectedLayer} />
                    <div className="flex-1 overflow-auto flex items-center overflow-x-auto max-w-full">
                        <Keyboard keyboard={keyboard!} selectedLayer={selectedLayer} setSelectedLayer={setSelectedLayer} />
                    </div>
                </div>
            </div>
        </SidebarProvider>
    );
};

export default EditorLayout;
