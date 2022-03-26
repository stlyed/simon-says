import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { defaultSettings } from "./data/defaultSettings";

// add settings to local storage
if (!localStorage.getItem("settings")) {
    localStorage.setItem("settings", JSON.stringify(defaultSettings));
}

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root")
);
