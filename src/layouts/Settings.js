import { useState, useCallback } from "react";
import { ImInfinite } from "react-icons/im";

import { isInfinite, overhaulSettings, resetSettingsToDefault, settings } from "../data/Settings";
import Button from "../components/Button";
import Slider from "../components/Slider";
import Text from "../components/Text";

import "./settings.scss";

const Settings = ({ className, innerRef, closeSettings }) => {
    // When ever I need react to rerender
    const [, updateState] = useState();
    const ForceUpdate = useCallback(() => updateState({}), []);

    const [tempSettings] = useState(settings());

    const handleSlider = slider => {
        tempSettings.forEach((element, index) => {
            if (element.name === slider.target.dataset.name) {
                tempSettings[index].value = slider.target.value;
            }
        });
        ForceUpdate();
    };

    const applySettings = () => {
        overhaulSettings(tempSettings);
        closeSettings()
    };

    const resetToDefaults = () => {
        resetSettingsToDefault();
        closeSettings()
    };

    return (
        <div className={`${className} settings__section`} ref={innerRef}>
            <div className="settings__container">
                {tempSettings.map(({ name, max, min, value }, index) => (
                    <div className="setting" key={index}>
                        <Text className="text">{name}</Text>
                        <Text className="value">
                            {isInfinite(name) ? (
                                <ImInfinite />
                            ) : (
                                <>
                                    {value < 10 ? 0 : ""}
                                    {value}
                                </>
                            )}
                        </Text>
                        <Slider
                            className="slider"
                            name={name}
                            max={max}
                            min={min}
                            onChange={handleSlider}
                            value={value}
                        />
                    </div>
                ))}
            </div>
            <div className="buttons">
                <Button positive onClick={applySettings}>
                    Apply
                </Button>
                <Button negative onClick={resetToDefaults}>
                    Reset To Default
                </Button>
            </div>
        </div>
    );
};

export default Settings;
