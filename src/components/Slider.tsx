import { FC } from "react";
import styles from "./.module.scss";

interface slider {
    onChange: (...args: any[]) => void;
    name: string;
    value: number;
    max: number;
    min?: number;
    className?: string;
}

const Slider: FC<slider> = ({ className, max, min = 0, value, onChange, name }) => {
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
