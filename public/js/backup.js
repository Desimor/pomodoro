var Timer = {
    minutesLeft: 0,
    secondsLeft: 5,
    isOnBreak: false,
    numberOfBreaks: 0,
    init: function () {
        this.cacheDOM();
        this.addListeners();
        this.render();
    },
    cacheDOM: function () {
        this.minutes = document.querySelector('#minutes');
        this.seconds = document.querySelector('#seconds');
        this.startButton = document.querySelector('#start');
        this.stopButton = document.querySelector('#stop');
        this.resetButton = document.querySelector('#reset');
    },
    render: function () {
        this.minutes.value = this.pad(this.minutesLeft);
        this.seconds.value = this.pad(this.secondsLeft);
    },
    addListeners: function () {
        this.startButton.addEventListener('click', this.start.bind(this));
        this.stopButton.addEventListener('click', this.stop.bind(this));
        this.resetButton.addEventListener('click', this.reset.bind(this));
    },
    reset: function () {
        console.log('rest');
        this.stop();
        this.minutesLeft = 0;
        this.secondsLeft = 5;
        this.render();
    },
    stop: function () {
        console.log('STOP!');
        this.timer = clearInterval(this.timer);
    },
    start: function () {
        console.log("start");
        if (!this.timer) {
            this.timer = setInterval(this.tick.bind(this), 1000);
        }
    },
    tick: function () {
        if (this.secondsLeft === 0 && this.minutesLeft === 0) {
            clearInterval(this.timer);
            this.timer = !this.timer;
            if (this.isOnBreak) {
                this.numberOfBreaks += 1;
                this.resetWorkTime();
            } else {
                this.resetBreakTime();
            }
            this.isOnBreak = !this.isOnBreak;
            this.render();
            return;
        }
        this.decrementMinutes();
        this.decrementSeconds();
        this.render();
    },
    decrementMinutes: function () {
        if (this.secondsLeft === 0) {
            this.minutesLeft -= 1;
        }
    },
    decrementSeconds: function () {
        if (this.secondsLeft === 0) {
            this.secondsLeft = 59;
        } else {
            this.secondsLeft -= 1;
        }
    },
    pad: function (num) {
        if (num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    },
    resetWorkTime: function () {
        this.minutesLeft = 00;
        this.secondsLeft = 05;
    },
    resetBreakTime: function () {
        if (this.numberOfBreaks < 3) {
            this.minutesLeft = 5;
        } else {
            this.minutesLeft = 15;
            this.numberOfBreaks = 0;
        }
        this.secondsLeft = 0;
    }
};



Timer.init();