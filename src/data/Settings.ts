interface settingsParams {
    name: string;
    max: number;
    min: number;
    value: number;
}

class Settings {
    /**
     * The key value pair inside of local storage
     */
    readonly localStorageKey = "memoryGame_Settings";

    /**
     * The most updated settings directly from local storage
     */
    readonly settings = (): settingsParams[] =>
        JSON.parse(localStorage.getItem(this.localStorageKey) || "{}");

    /**
     * An array of all the default values for each setting
     */
    readonly defaultSettings = [
        { name: "volume", max: 100, value: 30 },
        { name: "rounds", max: 21, min: 1, value: 8 },
        { name: "hearts", max: 11, min: 1, value: 3 },
        { name: "squares", max: 30, min: 3, value: 4 },
        { name: "time", max: 61, min: 5, value: 30 },
    ];

    /**
     * The parameters of a setting
     * @param settingName the name of setting you want to the parameters of. eg: "time"
     * @returns \{name, max, min, value} of the setting
     */
    public getParams(settingName: string): settingsParams {
        return this.settings().find((e: { name: string }) => e.name === settingName)!;
    }

    /**
     * The value of a setting
     * @param settingName the name of setting you want to the value of. eg: "time"
     * @returns value of the setting
     */
    public getValueOf(settingName: string): number {
        const { value, max } = this.getParams(settingName);
        const isInfinity = value === max && value.toString().slice(-1) === "1";
        return isInfinity ? Infinity : value;
    }

    /**
     * Completly change every setting
     * @param settings Brand new settings
     */
    public newSettings(settings: Object): void {
        localStorage.setItem(this.localStorageKey, JSON.stringify(settings));
    }

    /**
     * Reset each setting back to their default position
     */
    public resetToDefault(): void {
        localStorage.setItem(this.localStorageKey, JSON.stringify(this.defaultSettings));
    }
}

export default Settings
