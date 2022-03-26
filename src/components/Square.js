import React from "react";
import styles from "../styles/styles.module.scss";

const Square = ({ onClick, onMouseDown,onMouseUp, number, color, innerRef }) => {
    return (
        <div
            className={styles.squareItem}
            ref={innerRef}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onClick={onClick}
            style={{ background: color }}
            data-number={number}
        ></div>
    );
};

export default Square;
