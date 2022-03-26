import React from "react";
import styles from "./.module.scss";

const Slider = ({ className, max, min = 0, value, onChange, index }) => {
    return (
        <input
            type="range"
            min={min}
            max={max}
            value={value}
            className={`${className} ${styles.slider}`}
            onChange={onChange}
            data-index={index}
        />
    );
};

export default Slider;
