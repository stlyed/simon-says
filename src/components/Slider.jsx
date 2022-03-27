import React from "react";
import styles from "./.module.scss";

const Slider = ({ className, max, min = 0, value, onChange, name }) => {
    return (
        <input
            type="range"
            min={min}
            max={max}
            value={value}
            className={`${className} ${styles.slider}`}
            onChange={onChange}
            data-name={name}
        />
    );
};

export default Slider;
