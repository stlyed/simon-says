/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect, useState } from "react";
import Timer from "../data/timer";

import styles from "./.module.scss";

interface alert {
    innerRef: React.MutableRefObject<null>;
}

const Alert: FC<alert> = ({ innerRef, children }) => {
    const [alertText, setAlertText] = useState("");

    useEffect(() => {
        const timer = new Timer();
        const observer = new MutationObserver(mutationsList => {
            mutationsList.forEach(({ type }) => {
                if (type === "childList") {
                    timer.stop();
                    // @ts-ignore: Object is possibly 'null'
                    setAlertText(innerRef.current.textContent);

                    timer.start(2, () => {
                        setAlertText("");
                        // @ts-ignore: Object is possibly 'null'
                        innerRef.current.textContent = "";
                    });
                }
            });
        });
        observer.observe(innerRef.current, { childList: true });
    }, []);
    
    return (
        <div className={styles.alert__container}>
            <div
                ref={innerRef}
                // @ts-ignore Object is possibly 'null'
                className={`${alertText ? "" : styles.hide}  ${styles.alert}`}
            >
                {children}
            </div>
        </div>
    );
};

export default Alert;
