import React from "react";
import styles from "./.module.scss";

const Button = ({ children, onClick, style, negative, positive }) => {
    return (
        <h3
            className={`${styles.button} ${negative ? styles.negative : ""} ${
                positive ? styles.positive : ""
            }`}
            onClick={onClick}
            style={style}
        >
            {children}
        </h3>
    );
};

export default Button;
