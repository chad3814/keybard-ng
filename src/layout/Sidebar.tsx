import { ChevronsLeftRightEllipsis, Cpu, Footprints, HelpCircle, Keyboard, Layers, List, LucideIcon, Settings } from "lucide-react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";

import Logo from "@/components/Logo";
import { cn } from "@/lib/utils";

export type SidebarItem = {
    title: string;
    url: string;
    icon: LucideIcon;
};

export const primarySidebarItems: SidebarItem[] = [
    { title: "Basic Keyboard", url: "keyboard", icon: Keyboard },
    { title: "Layers", url: "layers", icon: Layers },
    { title: "Tapdances", url: "tapdances", icon: Footprints },
    { title: "Macros", url: "macros", icon: List },
    { title: "QMK Keys", url: "qmk", icon: Cpu },
    { title: "Misc Keys", url: "misc", icon: ChevronsLeftRightEllipsis },
];

const footerItems: SidebarItem[] = [
    { title: "Help", url: "/help", icon: HelpCircle },
    { title: "Settings", url: "/settings", icon: Settings },
];

type AppSidebarProps = {
    activeItem: string | null;
    onItemSelect: (item: SidebarItem) => void;
    detailsSidebar: ReturnType<typeof useSidebar>;
};

const AppSidebar = ({ activeItem, onItemSelect, detailsSidebar }: AppSidebarProps) => {
    const { state } = useSidebar("primary-nav", { defaultOpen: false });
    const isCollapsed = state === "collapsed";
    const sidebarClasses = cn(
        "z-11 fixed transition-[box-shadow,border-color] duration-300 ease-out border border-sidebar-border shadow-lg ml-2 h-[98vh] mt-[1vh] transition-all",
        state === "collapsed" ? "rounded-full " : "rounded-2xl"
    );
    const sidebarHeaderClasses = cn("flex items-center gap-2", isCollapsed ? "justify-center py-3" : "justify-center py-3");

    return (
        <Sidebar rounded name="primary-nav" defaultOpen={false} collapsible="icon" hideGap className={sidebarClasses}>
            <SidebarHeader className="p-1">
                <div className={sidebarHeaderClasses}>
                    <div className="flex items-center justify-center">
                        <Logo />
                    </div>
                    {!isCollapsed && <span className="text-xl font-bold">Keybard</span>}
                </div>
                <div className={cn("flex w-full", isCollapsed ? "justify-center" : "justify-center items-center")}>
                    <SidebarTrigger name="primary-nav" className="z-10" />
                    <span className={cn("mr-2 text-sm font-semibold text-slate-600 cursor-default", isCollapsed ? "hidden" : "block")}>Hide menu</span>
                </div>
            </SidebarHeader>

            <SidebarContent className="py-2">
                <SidebarMenu className="justify-center h-full">
                    {primarySidebarItems.map((item) => {
                        const isActive = activeItem === item.url;
                        return (
                            <SidebarMenuItem key={item.title} className={`cursor-pointer`}>
                                <SidebarMenuButton
                                    asChild
                                    tooltip={item.title}
                                    sidebarName="primary-nav"
                                    sidebarDefaultOpen={false}
                                    className={cn(
                                        "h-12 transition-colors hover:bg-sidebar-accent",
                                        isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground",
                                        isCollapsed ? "mx-0" : "mx-2"
                                    )}
                                >
                                    <button
                                        type="button"
                                        onClick={() => onItemSelect(item)}
                                        className="flex w-full items-center gap-3"
                                        aria-current={isActive ? "page" : undefined}
                                    >
                                        <item.icon className="h-5 w-5" />
                                        {!isCollapsed && <span>{item.title}</span>}
                                    </button>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        );
                    })}
                </SidebarMenu>
            </SidebarContent>

            <SidebarFooter className="px-2 py-4">
                <SidebarMenu>
                    {footerItems.map((item) => {
                        const isActive = activeItem === item.url;
                        return (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton
                                    asChild
                                    tooltip={item.title}
                                    sidebarName="primary-nav"
                                    sidebarDefaultOpen={false}
                                    className="h-12 transition-colors hover:bg-sidebar-accent"
                                >
                                    <button
                                        type="button"
                                        onClick={() => onItemSelect(item)}
                                        className={cn("flex w-full items-center gap-3", isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground")}
                                    >
                                        <item.icon className="h-5 w-5" />
                                        {!isCollapsed && <span>{item.title}</span>}
                                    </button>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        );
                    })}
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
};

export default AppSidebar;
