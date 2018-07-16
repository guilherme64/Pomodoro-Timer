window.addEventListener('DOMContentLoaded', function() {
    var startBtn = document.getElementById('start-btn');
    var timer = document.getElementById('timer');
    var mainRangeInput = document.getElementById('main-input');
    var restRangeInput = document.getElementById('rest-input');
    var mainTimer;
    var restTimer;
    var remainingTime;
    var remainingTimeBar = document.getElementById('bar-green');
    var timerType = 'p';


    var ruleOfThree = function(maxValue, curValue) {
        console.log((100 * curValue) / (maxValue * 60 * 1000));
        return (100 * curValue) / (maxValue * 60 * 1000);
    }

    startBtn.addEventListener('click', function startTimer() {
        //mainTimer = moment.duration(parseInt(mainRangeInput.value), 'minutes');
        //mainTimer.add(1, 'seconds');
        mainTimer = parseInt(mainRangeInput.value);
        restTimer = parseInt(restRangeInput.value);
        //restTimer = moment.duration(parseInt(restRangeInput.value), 'minutes');
        //restTimer.add(1, 'seconds');
        remainingTime = moment.duration(mainTimer, 'm');
        remainingTime.add(1, 's');


    });

    mainRangeInput.addEventListener('input', function showValue() {
        var mainLabel = document.getElementById('main-label');
        mainLabel.innerHTML = mainRangeInput.value;
        if (!mainTimer) {
            timer.innerHTML = mainRangeInput.value;
        }
    });

    restRangeInput.addEventListener('input', function showValue() {
        var restLabel = document.getElementById('rest-label');
        restLabel.innerHTML = restRangeInput.value;
    });

    setInterval(function() {
        //console.log(m > 0);
        if (timerType === 'p') {
            remainingTime.subtract(1, 's');
            timer.innerHTML = remainingTime.get('minutes') + ':' + remainingTime.get('seconds');
            remainingTimeBar.style.width = ruleOfThree(mainTimer, remainingTime) + '%';
            console.log(mainTimer * 60 * 1000 + ' ' + remainingTime);
            if (remainingTime.get('minutes') === 0 && remainingTime.get('seconds') === 0) {
                console.log('Acabouz o principal');
                console.log(remainingTime === 0);
                alert('Cabou o tempo');
                timerType = 'r';
                //mainTimer.stop();
            }
        } else if (timerType === 'r') {
            remainingTime.subtract(1, 's');
            remainingTime = moment.duration(restTimer, 'minutes');
            timer.innerHTML = remainingTime.get('minutes') + ':' + remainingTime.get('seconds');
            if (remainingTime.get('minutes') === 0 && remainingTime.get('seconds') === 0) {
                console.log('Acabouz o descanso');
                console.log(remainingTime === 0);
                alert('Cabou o tempo');
                //timerType = 'p';
                //mainTimer.stop();
            }
        }

    }, 1000);
});