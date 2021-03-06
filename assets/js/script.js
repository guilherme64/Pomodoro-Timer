window.addEventListener('DOMContentLoaded', function() {
    function Pomodoro(time) {

        //this.workTime = workTime;
        //this.restTime = restTime;
        this.time = time;
        this.Timer = moment.duration();
        //1o pro trabalho, segundo pro descanso.
        //this.timerRounds = 2;
        this.start = false;
        this.stop = false;

        this.setTimer = function(time) {
            this.start = true;
            this.Timer = moment.duration(parseInt(time), 'minutes');
            return this.Timer;
            //return this.Timer.add(parseInt(time), 'minutes');
        }

        this.getMinutes = function() {
            return this.Timer.get('minutes');
        }

        this.getSeconds = function() {
            return this.Timer.get('seconds');
        }

        this.ruleOfThree = function(maxValue, curValue) {
            console.log(curValue + ' <-Cur Max-> ' + maxValue);
            console.log(' resultado da regra de 3 ' + (100 * curValue) / (maxValue * 60 * 1000));
            return (100 * curValue) / (maxValue * 60 * 1000);
        }

    }

    function Update(pomodoro) {
        /**
         * O que fazer aqui:
         * Se o contador de voltas > 0 e o timer > 0:
         *  Subtrai um segundo
         *  Muda o mostrador 
         *  altera a barra
         * 
         * Se timer == 0:
         *  Contador de voltas--
         *  Se o contador for igual a 1:
         *  alert
         *  setTimer com rest
         * Else: start = false
         */
        console.log(pomodoro.workTime + ' <-W T-> ' + pomodoro.restTime);
        console.log(pomodoro.Timer + ' <-Timer Work -> ' + pomodoro.workTime);
        if (pomodoro.start === true && pomodoro.stop === false) {
            if (pomodoro.Timer > 0) {
                //if (pomodoro.timerRounds > 0) {
                pomodoro.Timer.subtract(1, 's');
                timer.innerHTML = pomodoro.getMinutes() + ':' + pomodoro.getSeconds();
                remainingTimeBar.style.width = pomodoro.ruleOfThree(pomodoro.time, pomodoro.Timer) + '%';
                document.title = pomodoro.getMinutes() + ':' + pomodoro.getSeconds() + ' Pomodoro';
                //}
            }
            /*else if (pomodoro.timerRounds === 2) {
                           pomodoro.timerRounds--;
                           pomodoro.setTimer(pomodoro.restTime);
                           alert('Vai descansar!');
                       }*/
            else {
                alert('Vai Trabalhar!');
                pomodoro.start = false;
                remainingTimeBar.style.width = '100%';
            }
        }
    }

    var startBtn = document.getElementById('start-btn');
    var stopBtn = document.getElementById('stop-btn');
    var timer = document.getElementById('timer');
    var workInput = document.getElementById('main-input');
    var restInput = document.getElementById('rest-input');
    var remainingTimeBar = document.getElementById('bar-green');
    var pomodoro = new Pomodoro(workInput.value);

    startBtn.addEventListener('click', function() {
        if (pomodoro.start === false) {
            /**
             Não é o ideal, mas a cada reinício, acabou ficando mais fácil reiniciar
             o pomodoro
             */
            pomodoro = new Pomodoro(timer.innerHTML);
            pomodoro.setTimer(pomodoro.time);
        } else if (pomodoro.stop === true) {
            pomodoro.stop = false;
        }
    });

    stopBtn.addEventListener('click', function() {
        pomodoro.stop = true;

    });

    workInput.addEventListener('input', function() {
        if (pomodoro.start === false) {
            timer.innerHTML = workInput.value;
            workInput.style.background = 'rgba(0, 255, 138,0.3)';
            restInput.style.background = 'white';
        }
        document.querySelector('label[for=' + workInput.id + ']').innerHTML = workInput.value;
    });

    restInput.addEventListener('input', function() {
        if (pomodoro.start === false) {
            timer.innerHTML = restInput.value;
            restInput.style.background = 'rgba(0, 255, 138,0.3)';
            workInput.style.background = 'white';
        }
        document.querySelector('label[for=' + restInput.id + ']').innerHTML = restInput.value;
    });

    setInterval(function() {
        Update(pomodoro);
    }, 1000);

});