var onStartTimeMinutes=25;
let maxChars = 2;
var timerInterval;
var minutes_label = document.getElementById("minutes");
var seconds_label = document.getElementById("seconds");
var minutes = parseInt(minutes_label.textContent);
var seconds = parseInt(seconds_label.textContent);
var btnstart = document.getElementById("btnstarttimer");
var btnpause = document.getElementById("btnpausetimer");
var checkbox = document.getElementById('myCheckbox');
var textField = document.getElementById('textField');
var label_chebox = document.getElementById('labelcheckbox');
var savebtn = document.getElementById("savebtn");
var pauseMinutes = 5;


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

function checkSettingsInput(inputElement) {
    var value = parseInt(inputElement.value);
    var valueString = value.toString(); // Converti il valore in stringa
    if (isNaN(value) || value > 59 || valueString.length > 2) { // Controlla la lunghezza della stringa
        inputElement.value = "00";
        return 0;
    }
    return value;
}


function setminutes() {
    var inputMinutesFocus = document.getElementById("inputminutesfocus");
    var inputSecondsFocus = document.getElementById("inputsecondsfocus");
    var inputMinutesPause = document.getElementById("inputminutespause");
    var inputSecondsPause = document.getElementById("inputsecondspause");

    onStartTimeMinutes = checkSettingsInput(inputMinutesFocus);
    onStartTimeSeconds = checkSettingsInput(inputSecondsFocus);
    pauseMinutes = checkSettingsInput(inputMinutesPause);
    pauseSeconds = checkSettingsInput(inputSecondsPause);

    minutes = onStartTimeMinutes;
    seconds = onStartTimeSeconds;
    setupTimer();
}


function testoModificato() {
    var minutesInput = document.getElementById("minutes");
    var secondsInput = document.getElementById("seconds");
    var inputMinutesFocus = document.getElementById("inputminutesfocus");
    var inputSecondsFocus = document.getElementById("inputsecondsfocus");

    var minutes = parseInt(minutesInput.textContent);
    var seconds = parseInt(secondsInput.textContent);

    // Controlla se il valore dei minuti supera 59 e aggiusta di conseguenza
    if (minutes > 59 || isNaN(minutes)) {
        minutesInput.textContent = "00";
        minutes = 0;
    }

    // Controlla se il valore dei secondi supera 59 e aggiusta di conseguenza
    if (seconds > 59 || isNaN(seconds)) {
        secondsInput.textContent = "00";
        seconds = 0;
    }

    onStartTimeMinutes = minutes;
    onStartTimeSeconds = seconds;

    inputMinutesFocus.value = minutes < 10 ? "0" + minutes : minutes;
    inputSecondsFocus.value = seconds < 10 ? "0" + seconds : seconds;
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

function checkLengthSettingsMinutesFocus(event){
    var currentCharsminutes = document.getElementById("minutessettingsfocus").textContent.length;
    if (currentCharsminutes >= maxChars) {
        event.preventDefault();
    }
}

function checkLengthSettingsMinutesPause(event){
    var currentCharsminutes = document.getElementById("minutessettingspause").textContent.length;
    if (currentCharsminutes >= maxChars) {
        event.preventDefault();
    }
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
    minutes = pauseMinutes;
    seconds = 0;
    setupTimer();
}

function openPopup() {
    var popup = document.getElementById("popup");
    var text = document.getElementById("pausetimerpopup");
    popup.style.display = "block";
    text.textContent = pauseMinutes;

}

function closePopup() {
    startPause()
    btnstart.click()
    var popup = document.getElementById("popup");
    popup.style.display = "none";
}

