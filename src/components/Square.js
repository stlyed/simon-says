import React from "react";
import styles from "../styles/styles.module.scss";

const Square = ({ onClick, onMouseDown, number, color }) => {
    return (
        <div
            className={styles.squareItem}
            onMouseDown={onMouseDown}
            onMouseUp={(e) => e.target.classList.remove(styles.activeSquare)}
            onClick={onClick}
            data-number={number}
            style={{ background: color }}
        ></div>
    );
};

export default Square;
