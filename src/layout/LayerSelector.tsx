import { FC } from "react";
import { svalService } from "@/services/sval.service";
import { useVial } from "@/contexts/VialContext";

interface Props {
    selectedLayer: number;
    setSelectedLayer: (layer: number) => void;
}

const LayerSelector: FC<Props> = ({ selectedLayer, setSelectedLayer }) => {
    const { keyboard } = useVial();

    // Get the keymap for the selected layer
    const layerKeymap = keyboard!.keymap?.[selectedLayer] || [];

    const handleSelectLayer = (layer: number) => () => {
        setSelectedLayer(layer);
    };
    return (
        <div className="h-[50px] py-10 w-full flex items-center justify-start text-gray-500">
            {Array.from({ length: keyboard!.layers || 16 }, (_, i) => {
                const layer = svalService.getLayerNameNoLabel(keyboard!, i);
                const isActive = selectedLayer === i;
                return (
                    // black bg for active layer 50% rounded corners
                    <div
                        key={layer}
                        onClick={handleSelectLayer(i)}
                        className={`
                        cursor-pointer px-5 py-1 mx-2 rounded-full transition-colors relative
                        ${isActive ? "bg-gray-800 text-white shadow-md" : "hover:bg-gray-200"}
                    `}
                    >
                        <span className="text-sm">{layer}</span>
                        {isActive && (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="inline-block h-6 w-6 ml-2 text-black hover:text-black absolute bg-white p-1 rounded-full shadow-md top-[-5px] right-[-10px] cursor-pointer"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                />
                            </svg>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default LayerSelector;
