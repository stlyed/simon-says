/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useCallback, useEffect, FC } from "react";
import { FaInfinity } from "react-icons/fa";

import Button from "../components/Button";
import Slider from "../components/Slider";
import Text from "../components/Text";

import { Settings } from "../data/Settings";

import "./settingsMenu.scss";

interface settings {
    className: string;
    innerRef: React.MutableRefObject<null>;
    settings: Settings;
    closeSettings: () => void;
    alertRef: React.MutableRefObject<null>;
}

const SettingsMenu: FC<settings> = ({ className, innerRef, alertRef, settings, closeSettings }) => {
    // When ever I need react to rerender
    const [, updateState] = useState<null | {}>();
    const ForceUpdate = useCallback(() => updateState({}), []);

    const [tempSettings, setTempSettings] = useState(settings.settings());

    /**
     * Temporary save the value that user is modifying
     * @param slider The slider that the user is interacting with
     */
    const handleSlider = (slider: any) => {
        tempSettings.forEach(({ name }, index) => {
            if (name === slider.target.dataset.name) {
                tempSettings[index].value = parseInt(slider.target.value);
            }
        });
        ForceUpdate();
    };

    /**
     * Change the value of the saved settings to the temporary ones
     */
    const applySettings = () => {
        settings.newSettings(tempSettings);
        // @ts-ignore: Object is possibly 'null'
        alertRef.current.textContent = "Settings saved succesfully!";
        closeSettings();
    };

    /**
     * Change the value of the saved settings to be back to the defaults
     */
    const resetToDefaults = () => {
        settings.resetToDefault();// @ts-ignore: Object is possibly 'null'
        alertRef.current.textContent = "Settings has been reset!";
        closeSettings();
    };

    // show saved settings whenver the settings button is clicked
    useEffect(() => {
        window.onclick = ({ target }) => {
            // @ts-ignore: Property 'classList' does not exist on type 'EventTarget'
            if (target.classList.contains("settings__button")) {
                setTempSettings(settings.settings());
            }
        };
    }, []);

    return (
        <div className={`${className} settings__section`} ref={innerRef}>
            <div className="settings__container">
                {tempSettings.map(({ name, max, min, value }, index) => {
                    const isInfinity = value === max && value.toString().slice(-1) === "1";

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

export default SettingsMenu;
