import { Switch } from "@/components/ui/switch";

const SETTINGS = [
    {
        name: "live-updating",
        label: "Live Updating",
        description: "Automatically apply changes to the keyboard as you make them.",
        defaultValue: true,
        type: "boolean",
    },
    {
        name: "typing-binds-key",
        label: "Typing binds a key",
        description: "When enabled, typing on your physical keyboard will bind the corresponding key on the layout.",
        defaultValue: false,
        type: "boolean",
    },
    {
        name: "serial-assignment",
        label: "Serial Assignment",
        type: "select",
        items: [
            { label: "Down columns then rows", value: "col-row" },
            { label: "Across rows then columns", value: "row-col" },
            { label: "Svalboard by key direction", value: "svalboard" },
        ],
        defaultValue: "col-row",
    },
    {
        name: "international-keyboards",
        label: "International Keyboards",
        type: "select",
        items: [
            { label: "English (US)", value: "us" },
            { label: "English (UK)", value: "uk" },
            { label: "Brazilian", value: "br" },
            { label: "Canadian (CSA)", value: "ca-csa" },
            { label: "Colemak", value: "colemak" },
            { label: "Croatian (QWERTZ)", value: "croatian-qwertz" },
            { label: "Danish", value: "danish" },
            { label: "EuroKey", value: "eurokey" },
            { label: "French (AZERTY)", value: "french-azerty" },
            { label: "French (Mac)", value: "french-mac" },
            { label: "German (QWERTZ)", value: "german-qwertz" },
            { label: "Hebrew (Standard)", value: "hebrew-standard" },
            { label: "Hungarian (QWERTZ)", value: "hungarian-qwertz" },
            { label: "Italian", value: "italian" },
            { label: "Japanese", value: "japanese" },
            { label: "Latin American", value: "latin-american" },
            { label: "Norwegian", value: "norwegian" },
            { label: "Russian", value: "russian" },
            { label: "Slovak", value: "slovak" },
            { label: "Spanish", value: "spanish" },
            { label: "Swedish", value: "swedish" },
            { label: "Swedish (SWERTY)", value: "swedish-swerty" },
            { label: "Swiss (QWERTZ)", value: "swiss-qwertz" },
            { label: "Turkish", value: "turkish" },
        ],
        defaultValue: "us",
    },
    {
        name: "import",
        label: "Import...",
        type: "action",
        action: "import-settings",
    },
    {
        name: "export",
        label: "Export...",
        type: "action",
        action: "export-settings",
    },
    {
        name: "print",
        label: "Print...",
        type: "action",
        action: "print-keymap",
    },
    {
        name: "qmk-settings",
        label: "QMK Settings...",
        type: "action",
        action: "open-qmk-settings",
    },
];

const SettingsPanel = () => {
    return (
        <section className="space-y-3 h-full max-h-full flex flex-col">
            <div className=" flex flex-col overflow-auto flex-grow gap-2">
                {SETTINGS.map((setting) => {
                    if (setting.type === "boolean") {
                        return (
                            <div className="flex flex-row items-center justify-between p-3 gap-3 panel-layer-item group/item" key={setting.name}>
                                <div className="flex flex-col items-start gap-3">
                                    <span className="text-md text-left">{setting.label}</span>
                                    <span className="text-xs text-muted-foreground">{setting.description}</span>
                                </div>
                                <Switch
                                    checked={setting.defaultValue as boolean}
                                    onCheckedChange={(checked) => {
                                        console.log(`Setting ${setting.name} changed to ${checked}`);
                                    }}
                                />
                            </div>
                        );
                    }
                    if (setting.type === "select") {
                        return (
                            <div className="flex flex-row items-center justify-between p-3 gap-3 panel-layer-item group/item" key={setting.name}>
                                <div className="flex flex-col items-start gap-3">
                                    <div className="text-md text-left">{setting.label}</div>
                                    {setting.description && setting.description !== "" && <span className="text-xs text-muted-foreground">{setting.description}</span>}
                                </div>
                                <select
                                    defaultValue={setting.defaultValue as string}
                                    onChange={(e) => {
                                        console.log(`Setting ${setting.name} changed to ${e.target.value}`);
                                    }}
                                    className=" h-8 px-3 font-bold rounded-md pr-3 cursor-pointer active:border-none focus:border-none"
                                >
                                    {setting.items?.map((item) => (
                                        <option key={item.value} value={item.value}>
                                            {item.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        );
                    }
                    if (setting.type === "action") {
                        return (
                            <div
                                className="flex flex-row items-center justify-between p-3 gap-3 panel-layer-item group/item cursor-pointer hover:bg-accent hover:text-accent-foreground rounded-md"
                                key={setting.name}
                                onClick={() => {
                                    console.log(`Action ${setting.action} triggered`);
                                }}
                            >
                                <span className="text-md text-left">{setting.label}</span>
                                <span className="text-xs text-muted-foreground">›</span>
                            </div>
                        );
                    }
                    return null;
                })}
            </div>
        </section>
    );
};

export default SettingsPanel;
