/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef } from "react";
import useState from "react-usestateref";
import Square from "./components/Square";
import Button from "./components/Button";
import Text from "./components/Text";
import styles from "./styles/styles.module.scss";
import "./styles/styles.global.scss";
import Settings from "./components/Settings";
import { AiFillHeart } from "react-icons/ai";

const App = () => {
    const [, updateState] = useState();
    const ForceUpdate = useCallback(() => updateState({}), []); // When ever I need react to rerender

    /**
     * * Functions for the backend
     */
    const [currentRound, setCurrentRound, currentRoundRef] = useState(0);

    const [showSettings, setShowSettings] = useState(false);
    const [settings] = useState(JSON.parse(localStorage.getItem("settings")));
    const getSetting = index => settings.find(e => e.name === index);
    const modifySetting = (settingName, newValue) => {
        settings.forEach((element, index) => {
            if (element.name === settingName) {
                settings[index].value = newValue;
            }
        });
    };

    /**
     * * Functions for the frontend
     */
    const squareRef = useRef([]);
    const [squareColors] = useState(
        Array(parseInt(getSetting("squares").value))
            .fill()
            .map(() => "#" + Math.floor(Math.random() * 16777215).toString(16))
    );
    const [squareOrder] = useState([]);
    const addSquare = () => {
        const selectRandomSquare = Math.floor(
            Math.random() * parseInt(getSetting("squares").value)
        );
        squareOrder.push(squareRef.current[selectRandomSquare]);
    };

    const animateSquares = async () => {
        setListening(false);

        const delay = ms => new Promise(res => setTimeout(res, ms));
        await delay(1500);
        for (const square of squareOrder) {
            square.classList.add(styles.activeSquare);
            await delay(2000);
            square.classList.remove(styles.activeSquare);
            await delay(500);
        }
        setListening(true);
    };

    /**
     * * Functions for the player
     */
    const [clickTracker, setClickTracker, clickTrackerRef] = useState(0);
    const [, setListening, listeningRef] = useState(false);
    const handleClick = square => {
        if (listeningRef.current) {
            const lives = parseInt(getSetting("lives").value);
            const correct = square.target === squareOrder[clickTrackerRef.current];
            if (lives && correct) {
                setClickTracker(clickTracker + 1);
                if (clickTrackerRef.current === squareOrder.length) {
                    setCurrentRound(currentRound + 1);
                    setClickTracker(0);
                    addSquare();
                    animateSquares();
                }
            } else {
                setClickTracker(0);
                modifySetting("lives", parseInt(getSetting("lives").value - 1));
                animateSquares();
            }
        }
    };

    /**
     * * Functions for the game
     */
    const start = () => {
        reset();
        addSquare();
        animateSquares();
    };

    const reset = () => {
        const newSettings = JSON.parse(localStorage.getItem("settings"));
        newSettings.forEach((element, index) => {
            settings[index] = element;
        });
        setListening(false);
        setClickTracker(0);
        setCurrentRound(0);
        ForceUpdate();
    };

    // get new settings
    useEffect(() => {
        window.addEventListener("storage", () => reset());
        return () => {
            window.removeEventListener("storage");
        };
    }, []);

    return (
        <div className={styles.app}>
            <nav className={styles.nav}>
                <Text className={styles.title}>Memory Game!</Text>
                <Button onClick={() => setShowSettings(!showSettings)}>Settings</Button>
                <Settings className={`${styles.settings} ${showSettings ? "" : styles.hide}`} />
            </nav>
            <main className={styles.main}>
                <Text>Welcome to the game! Repeat the pattern shown on screen!</Text>

                <div className="info">
                    <Button onClick={() => start()}>{"Start"}</Button>
                    <div className={styles.lives__container}>
                        {[...Array(parseInt(getSetting("lives").value))].map((e, index) => (
                            <Text key={index}>{<AiFillHeart />}</Text>
                        ))}
                    </div>

                    <Text>Time: {parseInt(getSetting("time").value)}s</Text>
                    <Text>
                        Round: {currentRound} / {parseInt(getSetting("rounds").value)}
                    </Text>
                </div>

                <div className={styles.squares}>
                    {[...Array(parseInt(getSetting("squares").value))].map((item, index) => (
                        <Square
                            key={index}
                            innerRef={e => squareRef.current.push(e)}
                            number={index}
                            onClick={handleClick}
                            onMouseDown={
                                listeningRef.current ? e => e.target.classList.add(styles.activeSquare) : null
                            }
                            onMouseUp={(e) => e.target.classList.remove(styles.activeSquare)}
                            color={squareColors[index]}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
};

export default App;
