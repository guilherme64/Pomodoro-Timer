window.addEventListener('DOMContentLoaded', function() {
    var startBtn = document.getElementById('start-btn');
    var timer = document.getElementById('timer');
    var mainRangeInput = document.getElementById('main-input');
    var restRangeInput = document.getElementById('rest-input');
    var mainTimer;
    var restTimer;
    var m;
    var timerType = 'p';

    startBtn.addEventListener('click', function startTimer() {
        //mainTimer = moment.duration(parseInt(mainRangeInput.value), 'minutes');
        //mainTimer.add(1, 'seconds');
        mainTimer = parseInt(mainRangeInput.value);
        restTimer = parseInt(restRangeInput.value);
        //restTimer = moment.duration(parseInt(restRangeInput.value), 'minutes');
        //restTimer.add(1, 'seconds');
        m = moment.duration(mainTimer, 'm');
        m.add(1, 's');


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
            m.subtract(1, 's');
            timer.innerHTML = m.get('minutes') + ':' + m.get('seconds');
            if (m.get('minutes') === 0 && m.get('seconds') === 0) {
                console.log('Acabouz o principal');
                console.log(m === 0);
                alert('Cabou o tempo');
                timerType = 'r';
                //mainTimer.stop();
            }
        } else if (timerType === 'r') {
            m.subtract(1, 's');
            m = moment.duration(restTimer, 'minutes');
            timer.innerHTML = m.get('minutes') + ':' + m.get('seconds');
            if (m.get('minutes') === 0 && m.get('seconds') === 0) {
                console.log('Acabouz o descanso');
                console.log(m === 0);
                alert('Cabou o tempo');
                //timerType = 'p';
                //mainTimer.stop();
            }
        }

    }, 1000);
});