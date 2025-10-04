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
    const showDetailsSidebar = !detailsSidebar.isMobile && detailsSidebar.state === "expanded";
    const sidebarClasses = cn(
        "z-11 fixed transition-[box-shadow,border-color] duration-300 ease-out border border-sidebar-border shadow-lg",
        state === "collapsed" ? "rounded-full ml-2 h-[99vh] mt-[0.5vh] transition-all" : "rounded-2xl ml-2 h-[99vh] mt-[0.5vh] transition-transform"
    );

    return (
        <Sidebar rounded name="primary-nav" defaultOpen={false} collapsible="icon" hideGap className={sidebarClasses}>
            <SidebarHeader className="p-4">
                <div className={`flex items-center ${isCollapsed ? "justify-center" : "justify-start"}`}>
                    <div className="flex h-12 w-12 items-center justify-center">
                        <Logo />
                    </div>
                    {!isCollapsed && <span className="text-xl font-bold">Keybard</span>}
                </div>
                <SidebarMenuItem key="primary-toggle">
                    <SidebarTrigger name="primary-nav" className="z-10" />
                </SidebarMenuItem>
            </SidebarHeader>

            <SidebarContent className="py-2">
                <SidebarMenu>
                    {primarySidebarItems.map((item) => {
                        const isActive = activeItem === item.url;
                        return (
                            <SidebarMenuItem
                                key={item.title}
                                className={`cursor-pointer ${isActive ? "border-l-3 border-black box-border" : "border-l-3 border-transparent border-r-3"}`}
                            >
                                <SidebarMenuButton
                                    asChild
                                    tooltip={item.title}
                                    sidebarName="primary-nav"
                                    sidebarDefaultOpen={false}
                                    className="h-12 transition-colors hover:bg-sidebar-accent w-full rounded-none"
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
