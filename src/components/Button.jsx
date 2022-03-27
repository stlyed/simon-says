import React from "react";
import styles from "./.module.scss";

const Button = ({ children, onClick, style, negative, positive, className }) => {
    return (
        <h3
            className={`${styles.button} ${negative ? styles.negative : ""} ${
                positive ? styles.positive : ""
            } ${className}`}
            onClick={onClick}
            style={style}
        >
            {children}
        </h3>
    );
};

export default Button;
