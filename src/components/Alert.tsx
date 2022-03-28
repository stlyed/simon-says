/* eslint-disable react-hooks/exhaustive-deps */
import { FC, useEffect } from "react";
import { Timer } from "../data/timer";
import useState from "react-usestateref";

import styles from "./.module.scss";

interface alert {
    innerRef: React.MutableRefObject<any>;
}

const Alert: FC<alert> = ({ children, innerRef }) => {
    const [, setPrevAlertText, prevAlertTextRef] = useState("");
    const [, setAlertText, alertTextRef] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [timer] = useState(new Timer(2));

    useEffect(() => {
        window.setInterval(() => {
            setAlertText(innerRef.current.textContent);
            if (prevAlertTextRef.current !== alertTextRef.current && alertTextRef.current !== " ") {
                setPrevAlertText(alertTextRef.current);
                setShowAlert(true);
                
                timer.stop();
                timer.start(2, () => {
                    setAlertText(" ");
                    setShowAlert(false);
                });
            }
        }, 100);
    }, []);

    return (
        <div className={styles.alert__container}>
            <div ref={innerRef} className={`${showAlert ? "" : styles.hide} ${styles.alert}`}>
                {children}
            </div>
        </div>
    );
};

export default Alert;
