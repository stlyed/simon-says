const Identifier = "settings";

export const settings = () => JSON.parse(localStorage.getItem(Identifier));

export const getSetting = setting => settings().find(e => e.name === setting);

export const changeSetting = (setting, value) => {
    const tempSettings = settings();
    tempSettings.forEach((element, index) => {
        if (element.name === setting) {
            tempSettings[index].value = value;
            localStorage.setItem(Identifier, JSON.stringify(tempSettings));
        }
    });
};

export const defaultSettings = [
    { name: "volume", max: 10, value: 5 },
    { name: "rounds", max: 11, min: 1, value: 8 },
    { name: "lives", max: 11, min: 1, value: 3 },
    { name: "squares", max: 30, min: 3, value: 4 },
    { name: "time", max: 61, min: 5, value: 30 },
];

export const resetSettings = () => {
    localStorage.setItem(Identifier, JSON.stringify(defaultSettings));
};
