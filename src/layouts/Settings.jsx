/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useCallback, useEffect } from "react";
import { FaInfinity } from "react-icons/fa";

import { overhaulSettings, resetSettingsToDefault, settings } from "../data/settings";
import Button from "../components/Button";
import Slider from "../components/Slider";
import Text from "../components/Text";

import "./settings.scss";

const Settings = ({ className, innerRef, closeSettings }) => {
    // When ever I need react to rerender
    const [, updateState] = useState();
    const ForceUpdate = useCallback(() => updateState({}), []);

    const [tempSettings, setTempSettings] = useState(settings());

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
        closeSettings();
    };

    const resetToDefaults = () => {
        resetSettingsToDefault();
        closeSettings();
    };

    // show saved settings whenver the settings button is clicked
    useEffect(() => {
        window.onclick = e => {
            if (e.target.classList.contains("settings__button")) {
                setTempSettings(settings());
            }
        };
    }, []);

    return (
        <div className={`${className} settings__section`} ref={innerRef}>
            <div className="settings__container">
                {tempSettings.map(({ name, max, min, value }, index) => {
                    const isInfinity =
                        parseInt(value) === parseInt(max) && value.toString().slice(-1) === "1";
                    
                        return (
                        <div className="setting" key={index}>
                            <Text className="text">{name}</Text>
                            <Text className="value">
                                {isInfinity ? (
                                    <FaInfinity />
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
                    );
                })}
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
