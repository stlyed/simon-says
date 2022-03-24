import React from "react";
import styles from "../styles/styles.module.scss";

const Button = ({ children, onClick }) => {
    return (
        <h3 className={styles.button} onClick={onClick}>
            {children}
        </h3>
    );
};

export default Button;
