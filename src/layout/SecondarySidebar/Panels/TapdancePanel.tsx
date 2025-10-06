import BindingsList from "../components/BindingsList";
import { FootprintsIcon } from "lucide-react";
import { useState } from "react";
import { useVial } from "@/contexts/VialContext";

const TapdancePanel = () => {
    const { keyboard } = useVial();
    const tapdances = (keyboard as any)?.tapdances || [];
    const [itemToEdit, setItemToEdit] = useState<number | null>(null);
    return (
        <BindingsList
            icon={<FootprintsIcon className="h-4 w-4 text-white" />}
            items={tapdances}
            setItemToEdit={(index) => {
                setItemToEdit(index);
            }}
            editElement={itemToEdit !== null ? <div>Edit Tapdance {itemToEdit}</div> : undefined}
        />
    );
};

export default TapdancePanel;
