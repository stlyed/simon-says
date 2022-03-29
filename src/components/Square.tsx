import { FC } from "react";
import styles from "./.module.scss";

interface square {
    onClick: (...args: any[]) => void;
    onMouseDown: (...args: any[]) => void;
    onMouseUp: (...args: any[]) => void;
    color: string;
    frequency: number;
    innerRef: (e: any) => number;
}

const Square: FC<square> = props => {
    return (
        <div
            className={styles.squareItem}
            ref={props.innerRef}
            onMouseDown={props.onMouseDown}
            onMouseUp={props.onMouseUp}
            onClick={props.onClick}
            style={{ background: props.color }}
            data-frequency={props.frequency}
        ></div>
    );
};

export default Square;
