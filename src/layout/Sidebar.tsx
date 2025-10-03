import { ChevronsLeftRightEllipsis, Cpu, Footprints, HelpCircle, Keyboard, Layers, List, Settings } from "lucide-react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";

import Logo from "@/components/Logo";
import { useState } from "react";

const menuItems = [
    { title: "Basic Keyboard", url: "keyboard", icon: Keyboard },
    { title: "Layers", url: "layers", icon: Layers },
    { title: "Tapdances", url: "tapdances", icon: Footprints },
    { title: "Macros", url: "macros", icon: List },
    { title: "QMK Keys", url: "qmk", icon: Cpu },
    { title: "Misc Keys", url: "misc", icon: ChevronsLeftRightEllipsis },
];

const footerItems = [
    { title: "Help", url: "/help", icon: HelpCircle },
    { title: "Settings", url: "/settings", icon: Settings },
];

const AppSidebar = () => {
    const { state } = useSidebar();
    const isCollapsed = state === "collapsed";
    const [activeItem, setActiveItem] = useState<string | null>(null);

    return (
        <>
            <Sidebar collapsible="icon" className="rounded-full border border-sidebar-border bg-sidebar-background shadow-lg fixed" defaultValue={"collapsed"}>
                <SidebarHeader className="p-4">
                    <div className={`flex items-center ${isCollapsed ? "justify-center" : "justify-start"}`}>
                        <div className="flex h-12 w-12 items-center justify-center">
                            <Logo />
                        </div>
                        {!isCollapsed && <span className="text-xl font-bold">Keybard</span>}
                    </div>
                    <SidebarMenuItem key="a">
                        <SidebarTrigger className="z-10" />
                    </SidebarMenuItem>
                </SidebarHeader>

                <SidebarContent className="py-2">
                    <SidebarMenu>
                        {menuItems.map((item) => (
                            <SidebarMenuItem
                                key={item.title}
                                className={`cursor-pointer ${
                                    activeItem === item.title ? "border-l-3 border-black box-border after:" : "border-l-3 border-transparent border-r-3"
                                } `}
                            >
                                <SidebarMenuButton asChild tooltip={item.title} className="h-12 transition-colors hover:bg-sidebar-accent w-full rounded-none">
                                    <div
                                        onClick={() => {
                                            setActiveItem(item.title);
                                        }}
                                        className={"w-full"}
                                    >
                                        <item.icon className="h-5 w-5" />
                                        {!isCollapsed && <span className="ml-3">{item.title}</span>}
                                    </div>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarContent>

                <SidebarFooter className="px-2 py-4">
                    <SidebarMenu>
                        {footerItems.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton asChild tooltip={item.title} className="h-12 transition-colors hover:bg-sidebar-accent">
                                    <div
                                        onClick={() => {
                                            setActiveItem(item.title);
                                        }}
                                        className={activeItem === item.title ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground"}
                                    >
                                        <item.icon className="h-5 w-5" />
                                        {!isCollapsed && <span className="ml-3">{item.title}</span>}
                                    </div>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarFooter>
            </Sidebar>
        </>
    );
};

export default AppSidebar;
