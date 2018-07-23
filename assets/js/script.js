window.addEventListener('DOMContentLoaded', function() {
    function Pomodoro(workTime, restTime) {

        this.workTime = parseInt(workTime);
        this.restTime = parseInt(restTime);
        this.Timer = moment.duration(30, 's');
        //1o pro trabalho, segundo pro descanso.
        this.timerRounds = 2;
        this.set = false;

        this.getMinutes = function() {
            console.log(this.Timer);
            return this.Timer.get('minutes');
        }

        this.getSeconds = function() {
            console.log(this.Timer);
            return this.Timer.get('seconds');
        }

        this.ruleOfThree = function(maxValue, curValue) {
            return (100 * curValue) / (maxValue * 60 * 1000);
        }

    }

    function setTimer(pomodoro, time) {
        if (pomodoro.set === false) {
            pomodoro.Timer.add(time, 'm');
        }
        return this.Timer.add(time, 'm');
    }

    function Update(pomodoro) {
        //console.log('not updating' + pomodoro.Timer + 'timer he');
        if (pomodoro.Timer > 0 && pomodoro.timerRounds > 0 && pomodoro.set === true) {
            pomodoro.Timer.subtract(1, 's');
            timer.innerHTML = pomodoro.getMinutes() + ':' + pomodoro.getSeconds();
            remainingTimeBar.style.width = pomodoro.ruleOfThree((pomodoro.timerRounds === 2 ? pomodoro.workTime : pomodoro.restTime), pomodoro.Timer) + '%';
            if (pomodoro.Timer === 0) {
                alert('Acabou o tempo');
                pomodoro.setTimer(restTime);
                pomodoro.timerRounds--;
            }
        } else {
            pomodoro.set = false;
        }
    }

    var startBtn = document.getElementById('start-btn');
    var timer = document.getElementById('timer');
    var workInput = document.getElementById('main-input');
    var restInput = document.getElementById('rest-input');
    var remainingTimeBar = document.getElementById('bar-green');

    var pomodoro = new Pomodoro(workInput.value, restInput.value);

    startBtn.addEventListener('click', function() {
        if (pomodoro.set === false) {
            pomodoro.workTime = workInput.value;
            pomodoro.restTime = restInput.value;
            pomodoro.setTimer(pomodoro.workTime);
            console.log(pomodoro.Timer + 'pomo');
        }
    });

    workInput.addEventListener('input', function() {
        timer.innerHTML = workInput.value;
        document.querySelector('label[for=' + workInput.id + ']').innerHTML = workInput.value;
        //pomodoro.workTime = workInput.value;
        console.log(workInput.value + 'value');
    });

    restInput.addEventListener('input', function() {
        document.querySelector('label[for=' + restInput.id + ']').innerHTML = restInput.value;
        //pomodoro.restTime = restInput.value;
    });

    setInterval(function() {
        Update(pomodoro);
    }, 1000);

});