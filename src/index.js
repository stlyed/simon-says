import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { resetSettingsToDefault } from "./data/settings";

// add settings to local storage
if (!localStorage.getItem("settings")) {
    resetSettingsToDefault()
}

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root")
);
