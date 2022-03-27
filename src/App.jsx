/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef } from "react";
import { AiFillHeart } from "react-icons/ai";
import { ImInfinite } from "react-icons/im";
import useState from "react-usestateref";

import { getSetting, getValue, isInfinite } from "./data/settings";
import Square from "./components/Square";
import Button from "./components/Button";
import Text from "./components/Text";
import Settings from "./layouts/Settings";

import "./app.scss";
import "./styles/styles.global.scss";
import { Timer } from "./data/timer";

const App = () => {
    const [, updateState] = useState();
    const ForceUpdate = useCallback(() => updateState({}), []); // When ever I need react to rerender

    /**
     * * Functions for the backend
     */
    const [, setCurrentRound, currentRoundRef] = useState(0);
    const [, setLivesLeft, livesLeftRef] = useState(getValue("lives"));
    const settingsRef = useRef(null);
    const [settingsIsOpen, setSettingsIsOpen] = useState(false);

    const showSettings = () => {
        if (settingsRef.current.classList.contains("hide")) {
            settingsRef.current.classList.remove("hide");
            setSettingsIsOpen(true);
        } else {
            settingsRef.current.classList.add("hide");
            setSettingsIsOpen(false);
        }
        setIsPlaying(false);
        reset();
        // TODO: make sure game is stopped before opening settings
    };

    const [timer] = useState(new Timer(getValue("time")));
    const [showTimer, setShowTimer] = useState(timer.getTime());
    // contininously update timer
    useEffect(() => {
        setInterval(() => {
            setShowTimer(timer.getTime());
        }, 1000);
    }, []);

    /**
     * * Functions for the frontend
     */
    const squareRef = useRef([]);
    const [squareColors] = useState(
        Array(parseInt(getSetting("squares").max))
            .fill()
            .map(() => "#" + Math.floor(Math.random() * 16777215).toString(16))
    );
    const [squareOrder] = useState([]); // the order the computer highlighted each square
    const addSquare = () => {
        const selectRandomSquare = Math.floor(Math.random() * getValue("squares"));
        squareOrder.push(squareRef.current[selectRandomSquare]);
    };

    const [, setInAnimation, inAnimationRef] = useState(0);
    const animateSquares = async () => {
        setInAnimation(true);

        while (inAnimationRef.current) {
            setListening(false);
            const delay = ms => new Promise(res => setTimeout(res, ms));
            await delay(1000);
            for (const square of squareOrder) {
                square.classList.add("activeSquare");
                await delay(2000);
                square.classList.remove("activeSquare");
                await delay(500);
            }
            setListening(true);
            timer.start();
            setInAnimation(false);
        }
    };

    /**
     * * Functions for the player
     */
    const [, setListening, listeningRef] = useState(false); // wheter or not to count when the player click on a square
    const [clickTracker, setClickTracker, clickTrackerRef] = useState(0); // number of times the player click on a square
    const handleClick = square => {
        if (listeningRef.current) {
            const correct = square.target === squareOrder[clickTrackerRef.current];
            if (livesLeftRef.current && correct) {
                setClickTracker(clickTracker + 1);
                if (clickTrackerRef.current === squareOrder.length) {
                    setCurrentRound(
                        isInfinite("rounds") ? currentRoundRef.current : currentRoundRef.current + 1
                    );
                    setClickTracker(0);
                    addSquare();
                    animateSquares();
                }
            } else {
                setClickTracker(0);
                setLivesLeft(isInfinite("lives") ? livesLeftRef.current : livesLeftRef.current - 1);
                animateSquares();
            }
        }
    };

    /**
     * * Functions for the game
     */
    const [, setIsPlaying, isPlayingRef] = useState(0);
    const start = event => {
        settingsRef.current.classList.add("hide");

        switch (isPlayingRef.current) {
            // if it is your first time clicking start after the window loaded
            case 0:
                reset();
                addSquare();
                animateSquares();
                break;
            // game is currently playing and needs to be stop
            case true:
                reset();
                break;
            // game is currenlty playing and needs to be started
            default:
                addSquare();
                animateSquares();
        }
        setSettingsIsOpen(false);
        timer.setTime(getValue("time"));
        setIsPlaying(!isPlayingRef.current);
    };

    const reset = () => {
        setListening(false);
        timer.stop();
        timer.setTime(getValue("time"));
        setClickTracker(0);
        setCurrentRound(0);
        setLivesLeft(getValue("lives"));
        squareOrder.length = 0;
        setInAnimation(true);
        ForceUpdate();
    };

    // winning and losing
    useEffect(() => {
        if (isPlayingRef.current) {
            if (livesLeftRef.current <= 0 || timer.getTime() === 0) {
                alert("you lost");
                setIsPlaying(false);
                reset();
            } else if (getValue("rounds") === currentRoundRef.current) {
                alert("you won");
            }
        }
    }, [currentRoundRef.current, livesLeftRef.current, showTimer]);

    return (
        <div className="app">
            <nav className="nav">
                <Text className="title">Memory Game!</Text>
                <Button onClick={showSettings} className="settings__button">
                    {settingsIsOpen ? "Cancel" : "Settings"}
                </Button>
                <Settings
                    className="hide settings"
                    innerRef={settingsRef}
                    closeSettings={showSettings}
                />
            </nav>
            <main className="main">
                <Text>Welcome to the game! Repeat the pattern shown on screen!</Text>

                <div className="info">
                    <Button
                        onClick={start}
                        negative={isPlayingRef.current}
                        positive={!isPlayingRef.current}
                    >
                        {isPlayingRef.current ? "Stop" : "Start"}
                    </Button>
                    <div className="lives__container">
                        {[...Array(livesLeftRef.current)].map((e, index) => (
                            <Text key={index}>{<AiFillHeart className="heart" />}</Text>
                        ))}
                    </div>

                    <Text className="time">
                        Time: {isInfinite("time") ? <ImInfinite className="infinity" /> : showTimer + "s"}
                    </Text>
                    <Text className="rounds">
                        Round: {currentRoundRef.current}
                        {isInfinite("rounds") ? "" : " / " + getValue("rounds")}
                    </Text>
                </div>

                <div className="squares">
                    {[...Array(parseInt(getSetting("squares").value))].map((item, index) => (
                        <Square
                            key={index}
                            innerRef={e => squareRef.current.push(e)}
                            number={index}
                            onClick={handleClick}
                            onMouseDown={
                                listeningRef.current
                                    ? e => e.target.classList.add("activeSquare")
                                    : null
                            }
                            onMouseUp={e => e.target.classList.remove("activeSquare")}
                            color={squareColors[index]}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
};

export default App;
