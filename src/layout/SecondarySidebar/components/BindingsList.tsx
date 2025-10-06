import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { FC, useEffect, useState } from "react";
import { GripVerticalIcon, PencilIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useVial } from "@/contexts/VialContext";

interface Props {
    icon: React.ReactNode;
    editElement?: React.ReactNode;
    items?: Array<any>;
    setItemToEdit: (item: any) => void;
}

interface ItemGroup<T> {
    label: string;
    items: Array<T>;
    startIndex: number;
    endIndex: number;
}

const BindingsList: FC<Props> = ({ editElement, icon, setItemToEdit, items = [] }) => {
    const { keyboard } = useVial();
    const itemsCount = items.length;
    const [groups, setGroups] = useState<ItemGroup<any>[]>([]);
    const [activeGroup, setActiveGroup] = useState<ItemGroup<any>>(groups[0] || null);
    if (itemsCount === 0) {
        return <div className="grid place-items-center h-full text-center text-sm text-muted-foreground px-6">No items available. Please add some first.</div>;
    }
    useEffect(() => {
        const groupSize = 20;
        const g: ItemGroup<any>[] = [];
        for (let i = 0; i < itemsCount; i += groupSize) {
            g.push({
                label: `${i} - ${Math.min(i + groupSize - 1, itemsCount - 1)}`,
                items: items.slice(i, i + groupSize),
                startIndex: i,
                endIndex: Math.min(i + groupSize - 1, itemsCount - 1),
            });
        }
        setGroups(g);
        setActiveGroup(g[0]);
    }, [items]);

    return (
        <section className="space-y-3 h-full max-h-full flex flex-col">
            <div className="flex flex-wrap items-center justify-center gap-4">
                <div className="flex items-center justify-between rounded-full p-1 gap-2 bg-muted/30">
                    {groups.map((group) => {
                        const isActive = group === activeGroup;
                        return (
                            <Button
                                key={group.label}
                                type="button"
                                size="sm"
                                variant={isActive ? "default" : "ghost"}
                                className={cn("px-8 py-1 text-md rounded-full", isActive ? "shadow" : "text-muted-foreground")}
                                onClick={() => setActiveGroup(group)}
                            >
                                {group.label}
                            </Button>
                        );
                    })}
                </div>
            </div>
            <div className=" flex flex-col overflow-auto flex-grow">
                <Dialog>
                    {activeGroup?.items.map((item, i) => {
                        return (
                            <div className="flex flex-row items-center justify-between p-3 gap-3 panel-layer-item group/item" key={i}>
                                <div className="flex flex-row items-center">
                                    <Button size="sm" variant="ghost" className="cursor-move group-hover/item:opacity-100 opacity-0">
                                        <GripVerticalIcon className="h-4 w-4" />
                                    </Button>
                                    {i + activeGroup.startIndex}
                                </div>
                                <span className="text-md text-left w-full border-b border-b-dashed py-2"></span>
                                <div className="flex flex-row flex-shrink-0 items-center gap-1">
                                    <div className="flex flex-col bg-black h-12 w-12 rounded-sm flex-shrink-0 items-center ">
                                        <div className="h-4 w-4 mt-2 mb-1 text-white">{icon}</div>
                                        <span className="text-xs text-white">{i + activeGroup.startIndex}</span>
                                    </div>

                                    <DialogTrigger asChild>
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            onClick={() => {
                                                setItemToEdit(i);
                                            }}
                                            className="px-4 py-1  group-hover/item:opacity-100 opacity-0"
                                        >
                                            <PencilIcon className="h-4 w-4" />
                                        </Button>
                                    </DialogTrigger>
                                </div>
                            </div>
                        );
                    })}
                    {editElement}
                </Dialog>
            </div>
        </section>
    );
};

export default BindingsList;
