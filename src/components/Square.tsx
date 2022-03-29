import { FC } from "react";
import styles from "./.module.scss";

interface square {
    onClick: (...args: any[]) => void;
    onMouseDown: (...args: any[]) => void;
    onMouseUp: (...args: any[]) => void;
    color: string
    innerRef: any
}

const Square: FC<square> = ({ onClick, onMouseDown, onMouseUp, color, innerRef }) => {
    return (
        <div
            className={styles.squareItem}
            ref={innerRef}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onClick={onClick}
            style={{ background: color }}
        ></div>
    );
};

export default Square;
