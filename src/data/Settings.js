const Identifier = "settings";

export const defaultSettings = [
    { name: "volume", max: 10, value: 5 },
    { name: "rounds", max: 11, min: 1, value: 8 },
    { name: "hearts", max: 11, min: 1, value: 3 },
    { name: "squares", max: 30, min: 3, value: 4 },
    { name: "time", max: 61, min: 5, value: 30 },
];

export const settings = () => JSON.parse(localStorage.getItem(Identifier));

export const getSetting = setting => settings().find(e => e.name === setting);

export const getValue = setting => {
    const { value, max } = getSetting(setting);
    return parseInt(value) === parseInt(max) ? Infinity : parseInt(value);
};

export const overhaulSettings = setting => {
    localStorage.setItem(Identifier, JSON.stringify(setting));
};

export const resetSettingsToDefault = () => {
    localStorage.setItem(Identifier, JSON.stringify(defaultSettings));
};
