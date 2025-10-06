import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { GripVerticalIcon, PencilIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { FC } from "react";
import { useVial } from "@/contexts/VialContext";

interface Props {
    icon: React.ReactNode;
    editElement?: React.ReactNode;
    items?: Array<any>;
    setItemToEdit: (item: any) => void;
}

const BindingsList: FC<Props> = ({ editElement, icon, setItemToEdit, items = [] }) => {
    const { keyboard } = useVial();
    return (
        <div className=" flex flex-col overflow-auto flex-grow">
            <Dialog>
                {items.map((item, i) => {
                    return (
                        <div className="flex flex-row items-center justify-between p-3 gap-3 panel-layer-item group/item" key={i}>
                            <div className="flex flex-row items-center">
                                <Button size="sm" variant="ghost" className="cursor-move group-hover/item:opacity-100 opacity-0">
                                    <GripVerticalIcon className="h-4 w-4" />
                                </Button>
                                {i}
                            </div>
                            <span className="text-md text-left w-full border-b border-b-dashed py-2"></span>
                            <div className="flex flex-row flex-shrink-0">
                                <div className="flex flex-col bg-black h-12 w-12 rounded-sm flex-shrink-0 items-center ">
                                    <div className="h-4 w-4 mt-2 mb-1 text-white">{icon}</div>
                                    <span className="text-xs text-white">{i}</span>
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
    );
};

export default BindingsList;
