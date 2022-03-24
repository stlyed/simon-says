import { useState } from "react";
import Square from "./components/Square";
import Button from "./components/Button";
import Text from "./components/Text";
import styles from "./styles/styles.module.scss";
import "./styles/styles.global.scss";

const App = () => {
    const [lives, setLives] = useState(3);
    const [time, setTime] = useState(null);
    const [round, setRound] = useState(0);
    const [totalSquares, setTotalSquares] = useState(4);

    const getRandomColor = () =>
        "#" + Math.floor(Math.random() * 16777215).toString(16);

    const start = () => {
        reset();
		// highlight a random square
		// listen for when user click on a square
		// if it is the same square, then next round
		// if not, remove a life
    };

    const reset = () => {
        setLives(3);
        setRound(0);
    };

    return (
        <div className={styles.app}>
            <nav className={styles.nav}>
                <Text className={styles.title}>Simons Says!</Text>
                <Button onClick={(e) => console.log()}>Settings</Button>
            </nav>
            <main className={styles.main}>
                <Text>
                    Welcome to the game! Repeat the pattern shown on screen!
                </Text>

                <div className="info">
                    <Button onClick={() => start}>Start</Button>
                    <Text>Lives: {lives}</Text>
                    <Text>Time Left: {time || Infinity}</Text>
                    <Text>Round: {round} / 8</Text>
                </div>

                <div className={styles.squares}>
                    {[...Array(totalSquares)].map((item, index) => (
                        <Square
                            key={index}
                            onClick={(e) =>
                                console.log(e.target.dataset.number)
                            }
                            number={index}
                            color={getRandomColor()}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
};

export default App;
