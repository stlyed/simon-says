import { FC } from "react";
import styles from "./.module.scss";

interface button {
    onClick: () => void;
    negative?: boolean | number;
    positive?: boolean | number;
    className?: string;
}

const Button: FC<button> = ({ children, onClick, negative, positive, className }) => {
    return (
        <h3
            className={`${styles.button} ${negative ? styles.negative : ""} ${
                positive ? styles.positive : ""
            } ${className}`}
            onClick={onClick}
        >
            {children}
        </h3>
    );
};

export default Button;
