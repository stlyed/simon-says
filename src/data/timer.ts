export class Timer {
    private _interval: number | null;
    private _timeRemaining: number;
    private _callback: (() => void) | null;

    /**
     * Countdown timer, you give it a time and then you can start.
     * It will stop when the time comes or you can stop it ahead of time
     * @param time How long to set the timer
     * @param callback Callback function that get execute when timer stops by itself
     */
    constructor(time: number, callback: () => void = null) {
        this._interval = null;
        this._timeRemaining = time;
        this._callback = callback;
    }

    /**
     * Start counting down the timer.
     *
     * Note: timer will automatically stop at 0.
     *
     * @param callback This does accept a Callback function that get execute when timer stops by itself
     */
    public start(time: number | undefined = null, callback: () => void = null): void {
        void (time && (this.timeRemaining = time));
        this._callback = callback;

        if (this._timeRemaining === 0) return;
        this._interval = window.setInterval(() => {
            this._timeRemaining--;
            if (this._timeRemaining === 0) {
                if (this._callback) {
                    this._callback()
                }
                this.stop();
            }
        }, 1000);
    }

    /**
     * Stop the timer ahead of time
     */
    public stop(): void {
        clearInterval(this._interval!);
        this._interval = null;
    }

    /**
     * Change how long the timer goes on for
     */
    public set timeRemaining(time: number) {
        this._timeRemaining = time;
    }

    /**
     * Change the callback function
     */
    public set callback(callback: () => void) {
        this._callback = callback;
    }

    /**
     * Get how much time is left in the timer
     */
    public get timeRemaining(): number {
        return this._timeRemaining;
    }
}
