export class Timer {
    constructor(time) {
        this.interval = null;
        this.timeRemaining = time;
    }

    start() {
        if (this.timeRemaining === 0) return;
        this.interval = setInterval(() => {
            this.timeRemaining--;
            if (this.timeRemaining === 0) {
                this.stop();
            }
        }, 1000);
    }

    stop() {
        clearInterval(this.interval);
        this.interval = null;
    }

    setTime(time) {
        this.timeRemaining = time;
    }

    getTime() {
        return this.timeRemaining;
    }
}
