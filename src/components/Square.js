import React from "react";
import styles from "../styles/styles.module.scss";

const Square = ({ number, onClick, color }) => {
    return (
        <div
            className={styles.squareItem}
            data-number={number}
            style={{ background: color }}
            onClick={onClick}
        ></div>
    );
};

export default Square;
