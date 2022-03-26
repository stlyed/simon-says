import React from "react";
import styles from "./.module.scss";

const Button = ({ children, onClick, style }) => {
    return (
        <h3 className={styles.button} onClick={onClick} style={style}>
            {children}
        </h3>
    );
};

export default Button;
