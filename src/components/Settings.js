import { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import Slider from "./Slider";
import Text from "./Text";
import { defaultSettings } from "../data/defaultSettings";
import { ImInfinite } from "react-icons/im";

const SettingsStyles = styled.div`
    border: 2px solid white;
    width: 30rem;
    height: 15rem;
    padding: 1rem;
    background: radial-gradient(rgb(110, 181, 184), rgb(40, 77, 78));

    .settings__container {
        margin-bottom: 1rem;
        .setting {
            display: grid;
            grid-template-columns: 1fr 10px 1fr;
            grid-gap: 1rem;
            margin-bottom: 0.25rem;
            .text {
                text-align: right;
                text-transform: capitalize;
                font-weight: 300;
            }
            .value {
                text-align: center;
            }
        }
    }

    .buttons {
        display: flex;
        justify-content: space-evenly;
    }
`;

const Settings = ({ className }) => {
    const [, ForceUpdate] = useState(""); // When ever I need react to rerender, just setState with a random value
    const [settings] = useState(JSON.parse(localStorage.getItem("settings")));

    const saveSettings = () => {
        localStorage.setItem("settings", JSON.stringify(settings));
        window.dispatchEvent(new Event("storage"));
    };

    const resetSettings = () => {
        localStorage.setItem("settings", JSON.stringify(defaultSettings));
        window.dispatchEvent(new Event("storage"));
    };

    const handleSlider = event => {
        settings[event.target.dataset.index].value = event.target.value;
        ForceUpdate(event);
    };

    // when you refresh the settings to default, show the defaults settings
    useEffect(() => {
        window.addEventListener("storage", () => {
            const newSettings = JSON.parse(localStorage.getItem("settings"));
            newSettings.forEach((element, index) => {
                settings[index] = element;
            });
            ForceUpdate(newSettings);
        });
        return () => {
            window.removeEventListener("storage");
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <SettingsStyles className={className}>
            <div className="settings__container">
                {settings.map(({ name, max, min }, index) => (
                    <div className="setting" key={index}>
                        <Text className="text">{name}</Text>
                        <Text className="value">
                            {settings[index].value == max &&
                            settings[index].value.toString().slice(-1) == 1 ? (
                                <ImInfinite />
                            ) : (
                                <>
                                    {settings[index].value < 10 ? 0 : ""}
                                    {settings[index].value}
                                </>
                            )}
                        </Text>
                        <Slider
                            className="slider"
                            index={index}
                            max={max}
                            min={min}
                            onChange={handleSlider}
                            value={settings[index].value}
                        />
                    </div>
                ))}
            </div>
            <div className="buttons">
                <Button
                    style={{ background: "Chartreuse", color: "black" }}
                    onClick={() => saveSettings()}
                >
                    Apply
                </Button>
                <Button style={{ background: "red" }} onClick={() => resetSettings()}>
                    Reset To Default
                </Button>
            </div>
        </SettingsStyles>
    );
};

export default Settings;
