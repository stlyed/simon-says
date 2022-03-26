import { useEffect, useState } from "react";
import Square from "./components/Square";
import Button from "./components/Button";
import Text from "./components/Text";
import styles from "./styles/styles.module.scss";
import "./styles/styles.global.scss";
import Settings from "./components/Settings";
import { AiFillHeart } from "react-icons/ai";

const App = () => {
    const [lives, setLives] = useState(3);
    const [time, setTime] = useState(0);
    const [round, setRound] = useState(0);
    const [totalRounds, setTotalRounds] = useState(0);
    const [listening, setListening] = useState(false);

    const [totalSquares, setTotalSquares] = useState(0);
    const [squareOrder] = useState([]);
    const [playerOrder] = useState([]);
    const [clickTracker, setClickTracker] = useState(0);

    const [showSettings, setShowSettings] = useState(false);
    const [colors] = useState(
        Array(5)
            .fill()
            .map(() => "#" + Math.floor(Math.random() * 16777215).toString(16))
    );

    const start = () => {
        squareOrder.push(Math.floor(Math.random() * totalSquares));
        animateSquares();
    };

    const reset = () => {
        setListening(false);
        const settings = JSON.parse(localStorage.getItem("settings"));
        const getvalue = index => parseInt(settings.find(e => e.name === index).value);

        setTotalSquares(getvalue("squares"));
        setTotalRounds(getvalue("rounds"));
        setTime(getvalue("time"));
        setLives(getvalue("lives"));

        setRound(0);
        setClickTracker(0);
        squareOrder.length = 0;
        playerOrder.length = 0;
    };

    const animateSquares = async () => {
        setListening(false);
        const delay = ms => new Promise(res => setTimeout(res, ms));

        await delay(1500);
        // highlight all the square in the order they were chosen
        for (const currentSquare of squareOrder) {
            const square = document.querySelector(`[data-number='${currentSquare}']`);
            square.classList.add(styles.activeSquare);
            await delay(2000);
            square.classList.remove(styles.activeSquare);
            await delay(500);
        }
        setListening(true);
    };

    const handleClick = square => {
        if (listening) {
            if (squareOrder[clickTracker] === parseInt(square.target.dataset.number)) {
                setClickTracker(clickTracker + 1);
                playerOrder.push(square);

                // if the user click all the things that simon said
                if (squareOrder.length === playerOrder.length) {
                    playerOrder.length = 0;
                    setClickTracker(0);
                    setRound(round + 1);
                    squareOrder.push(Math.floor(Math.random() * totalSquares));
                    animateSquares();
                }
                // if user click the wrong box
            } else {
                setLives(lives - 1);
                playerOrder.length = 0;
                setClickTracker(0);
                animateSquares();
            }
        }
    };

    useEffect(() => {
        // when the page loads
        reset();

        // if settings are changed
        window.addEventListener("storage", () => {
            reset();
        });
        return () => {
            window.removeEventListener("storage");
        };
    }, []);

    // when player either wins or loses
    useEffect(() => {
        if (lives === 0) {
            alert("you lost");
            reset();
        } else if (round === 8) {
            alert("you won");
            reset();
        }
    }, [round, lives]);

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
                    <Button onClick={() => start()}>{round === 0 ? "Start" : "Restart"}</Button>
                    <div className={styles.lives__container}>
                        {[...Array(lives)].map((e, index) => (
                            <Text key={index}>{<AiFillHeart />}</Text>
                        ))}
                    </div>

                    <Text>Time: {time}s</Text>
                    <Text>
                        Round: {round} / {totalRounds}
                    </Text>
                </div>

                <div className={styles.squares}>
                    {[...Array(totalSquares)].map((item, index) => (
                        <Square
                            key={index}
                            number={index}
                            onClick={e => handleClick(e)}
                            onMouseDown={
                                listening ? e => e.target.classList.add(styles.activeSquare) : null
                            }
                            color={colors[index]}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
};

export default App;
