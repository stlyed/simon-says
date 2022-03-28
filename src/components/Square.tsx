import { FC } from "react";
import styles from "./.module.scss";

interface square {
    onClick: (square: any) => void;
    onMouseDown: (...args: any) => any;
    onMouseUp: (...args: any) => any;
    number: number
    color: string
    innerRef: any
}

const Square: FC<square> = ({ onClick, onMouseDown, onMouseUp, number, color, innerRef }) => {
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
