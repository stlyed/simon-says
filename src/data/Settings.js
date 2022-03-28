export class Settings {
    get localStorageKey() {
        return "settings";
    }

    get settings() {
        return () => JSON.parse(localStorage.getItem(this.localStorageKey));
    }

    get defaultSettings() {
        return [
            // { name: "volume", max: 10, value: 5 },
            { name: "rounds", max: 11, min: 1, value: 8 },
            { name: "hearts", max: 11, min: 1, value: 3 },
            { name: "squares", max: 30, min: 3, value: 4 },
            { name: "time", max: 61, min: 5, value: 30 },
        ];
    }

    getParams(settingName) {
        return this.settings().find(e => e.name === settingName);
    }

    getValueOf(settingName) {
        const { value, max } = this.getParams(settingName);
        const isInfinity = parseInt(value) === parseInt(max) && value.toString().slice(-1) === "1";
        return isInfinity ? Infinity : parseInt(value);
    }

    newSettings(settings) {
        localStorage.setItem(this.localStorageKey, JSON.stringify(settings));
    }

    resetToDefault() {
        localStorage.setItem(this.localStorageKey, JSON.stringify(this.defaultSettings));
    }
}
