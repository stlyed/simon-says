/* eslint-disable eqeqeq */
import { useState, useCallback } from "react";
import { ImInfinite } from "react-icons/im";

import { changeSetting, resetSettings, settings } from "../data/Settings";
import Button from "../components/Button";
import Slider from "../components/Slider";
import Text from "../components/Text";

import "./settings.scss";

const Settings = ({ className }) => {
    // When ever I need react to rerender
    const [, updateState] = useState();
    const ForceUpdate = useCallback(() => updateState({}), []); 

    const handleSlider = event => {
        changeSetting(event.target.dataset.name, event.target.value);
        ForceUpdate();
    };

    const resetToDefaults = () => {
        resetSettings();
        ForceUpdate();
    };

    // show the value of sliders or infinite
    const showValue = (value, max) => {
        if (value == max && value.toString().slice(-1) == 1) {
            return <ImInfinite />;
        }
        return (
            <>
                {value < 10 ? 0 : ""}
                {value}
            </>
        );
    };

    return (
        <div className={`${className} settings__section`}>
            <div className="settings__container">
                {settings().map(({ name, max, min, value }, index) => (
                    <div className="setting" key={index}>
                        <Text className="text">{name}</Text>
                        <Text className="value">
                            {showValue(value, max)}
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
                <Button style={{ background: "red" }} onClick={resetToDefaults}>
                    Reset To Default
                </Button>
            </div>
        </div>
    );
};

export default Settings;
