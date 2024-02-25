var onStartTimeMinutes=25;
var onStartTimeSeconds=0;
let maxChars = 2;
var timerInterval;
var minutes_label = document.getElementById("minutes");
var seconds_label = document.getElementById("seconds");
var minutes = parseInt(minutes_label.textContent);
var seconds = parseInt(seconds_label.textContent);
var btnstart = document.getElementById("btnstarttimer");
var btnpause = document.getElementById("btnpausetimer");

function checkLengthMinutes(event) {
    var currentCharsminutes = document.getElementById("minutes").textContent.length;
    if (currentCharsminutes >= maxChars) {
        event.preventDefault();
    }
}

function checkLengthSeconds(event) {
    var currentCharsSeconds = document.getElementById("seconds").textContent.length;
    if (currentCharsSeconds >= maxChars) {
        event.preventDefault();
    }
}

function testoModificato() {
    onStartTimeMinutes = parseInt(document.getElementById("minutes").textContent);
    onStartTimeSeconds = parseInt(document.getElementById("seconds").textContent);
}


function setupTimer() {
    minutes_label.textContent = (minutes < 10 ? "0" + minutes : minutes);
    seconds_label.textContent = (seconds < 10 ? "0" + seconds : seconds);
}



function startTimer() {
    var audio = document.getElementById("audio"); 
    btnpause.disabled = false;
    btnstart.disabled = true;
    minutes_label.contentEditable = false;
    seconds_label.contentEditable = false;
    minutes = parseInt(minutes_label.textContent);
    seconds = parseInt(seconds_label.textContent);
    minutes = (minutes > 59 ? 59 : minutes);
    seconds = (seconds > 59 ? 59 : seconds);
    setupTimer()
    timerInterval = setInterval(function() {
        if (minutes === 0 && seconds === 0) {
            clearInterval(timerInterval);
            openPopup();
            audio.play();
        } else {
            if (seconds === 0) {
                minutes--;
                seconds = 59;
            } else {
                seconds--;
            }

            minutes_label.textContent = (minutes < 10 ? "0" + minutes : minutes);
            seconds_label.textContent = (seconds < 10 ? "0" + seconds : seconds);
        }
    }, 1000);
}

function pauseTimer() {
    btnpause.disabled=true;
    btnstart.disabled=false;
    minutes_label.contentEditable = true;
    seconds_label.contentEditable = true;
    clearInterval(timerInterval);
}

function stopTimer(){
    pauseTimer();
    minutes = onStartTimeMinutes;
    seconds = onStartTimeSeconds;
    setupTimer();
}

function startPause(){
    pauseTimer();
    minutes = 5;
    seconds = 0;
    setupTimer();
}

function openPopup() {
    var popup = document.getElementById("popup");
    popup.style.display = "block";
}

function closePopup() {
    startPause()
    var popup = document.getElementById("popup");
    popup.style.display = "none";
}

