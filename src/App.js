/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useRef } from "react";
import useState from "react-usestateref";
import Square from "./components/Square";
import Button from "./components/Button";
import Text from "./components/Text";
import Settings from "./layouts/Settings";
import { AiFillHeart } from "react-icons/ai";
import "./app.scss";
import "./styles/styles.global.scss";

const App = () => {
    const [, updateState] = useState();
    const ForceUpdate = useCallback(() => updateState({}), []); // When ever I need react to rerender

    /**
     * * Functions for the backend
     */
    const [currentRound, setCurrentRound] = useState(0);

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
            square.classList.add("activeSquare");
            await delay(2000);
            square.classList.remove("activeSquare");
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
        <div className="app">
            <nav className="nav">
                <Text className="title">Memory Game!</Text>
                <Button onClick={() => setShowSettings(!showSettings)}>Settings</Button>
                <Settings className={`settings ${showSettings ? "" : "hide"}`} />
            </nav>
            <main className='main'>
                <Text>Welcome to the game! Repeat the pattern shown on screen!</Text>

                <div className="info">
                    <Button onClick={() => start()}>{"Start"}</Button>
                    <div className='lives__container'>
                        {[...Array(parseInt(getSetting("lives").value))].map((e, index) => (
                            <Text key={index}>{<AiFillHeart />}</Text>
                        ))}
                    </div>

                    {/* <Text>Time: {parseInt(getSetting("time").value)}s</Text> */}
                    <Text>Time: {parseInt(getSetting("time").value)}s</Text>
                    <Text>
                        Round: {currentRound} / {parseInt(getSetting("rounds").value)}
                    </Text>
                </div>

                <div className='squares'>
                    {[...Array(parseInt(getSetting("squares").value))].map((item, index) => (
                        <Square
                            key={index}
                            innerRef={e => squareRef.current.push(e)}
                            number={index}
                            onClick={handleClick}
                            onMouseDown={
                                listeningRef.current
                                    ? e => e.target.classList.add('activeSquare')
                                    : null
                            }
                            onMouseUp={e => e.target.classList.remove('activeSquare')}
                            color={squareColors[index]}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
};

export default App;
