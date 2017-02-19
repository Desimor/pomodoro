var Timer = {
    minutesLeft: 25,
    secondsLeft: 00,
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
        this.setButton = document.querySelector('#setTime');
        this.startButton = document.querySelector('#start');
        this.stopButton = document.querySelector('#stop');
        this.resetButton = document.querySelector('#reset');
    },
    render: function () {
        this.minutes.value = this.pad(this.minutesLeft);
        this.seconds.value = this.pad(this.secondsLeft);
    },
    addListeners: function () {
        this.setButton.addEventListener('click', this.setTimer.bind(this));
        this.startButton.addEventListener('click', this.start.bind(this));
        this.stopButton.addEventListener('click', this.stop.bind(this));
        this.resetButton.addEventListener('click', this.reset.bind(this));
    },
    setTimer: function () {
        this.minutesLeft = +this.minutes.value;
        this.startMinutes = +this.minutes.value;
        this.secondsLeft = +this.seconds.value;
        this.startSeconds = +this.seconds.value;
        console.log(typeof this.minutesLeft);
    },
    start: function () {
        console.log("start");
        if (!this.timer) {
            this.timer = setInterval(this.tick.bind(this), 1000);
        }
    },
    stop: function () {
        console.log('STOP!');
        this.timer = clearInterval(this.timer);
    },
    reset: function () {
        console.log('rest');
        this.stop();
        this.minutesLeft = +this.startMinutes;
        this.secondsLeft = +this.startSeconds;
        this.render();
    },
    tick: function () {
        if (this.secondsLeft == 0 && this.minutesLeft == 0) {
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
        if (this.secondsLeft == 0) {
            this.minutesLeft -= 1;
        }
    },
    decrementSeconds: function () {
        if (this.secondsLeft == 0) {
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
        this.minutesLeft = this.minutes.value;
        this.secondsLeft = this.seconds.value;
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
// Data and Variable Declarations
// var timer;
// var minutesLeft = 00;
// var secondsLeft = 5;
// var isOnBreak = false;
// var numberOfBreaks = 0;
//Getting References the DOM
// var minutes = document.querySelector('#minutes');
// var seconds = document.querySelector('#seconds');
// var startButton = document.querySelector('#start');
//Initialization Code 
    //Event Listeners
    // startButton.addEventListener('click', start);
    // render();
//Function Definitions
// function start(){
//     console.log(timer);
//     if(!timer){
//         timer = setInterval(tick, 1000);
//     }
// };
// function tick(){
//     if(secondsLeft === 0 && minutesLeft === 0){
//         clearInterval(timer);
//         timer = !timer;
//         if(isOnBreak){
//             numberOfBreaks += 1;
//             resetWorkTime();
//         } else {
//             resetBreakTime();
//         }
//         isOnBreak = !isOnBreak;
//         render();
//         return;
//     }
//     decrementMinutes();
//     decrementSeconds();
//     render();
// };
// function decrementMinutes(){
//     if(secondsLeft === 0){
//         minutesLeft -= 1;
//     }
// };
// function decrementSeconds(){
//     if(secondsLeft === 0){
//         secondsLeft = 59;
//     } else {
//         secondsLeft -= 1;
//     }
// };
// function render(){
//     minutes.textContent = pad(minutesLeft);
//     seconds.textContent = pad(secondsLeft);
// };

// function resetWorkTime(){
//     minutesLeft = 00;
//     secondsLeft = 05;
// }
// function resetBreakTime(){
//     if(numberOfBreaks < 3){
//         minutesLeft = 5;
//     } else {
//         minutesLeft = 15;
//         numberOfBreaks = 0;
//     }
//     secondsLeft = 0;
// }

// function pad(num){
//     if(num < 10){
//         return `0${num}`;
//     } else {
//         return num;
//     }
// };