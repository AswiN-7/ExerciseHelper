// ====================> mode <===============================
var modeButton = document.getElementById('mode')

document.body.classList.add('dark-mode');
modeButton.innerText = "Light";

modeButton.addEventListener('click', toggleMode);

function toggleMode() {
    document.body.classList.toggle('dark-mode');
    if (modeButton.innerText == 'Light') {
        modeButton.innerText = 'Dark';
    }
    else {
        modeButton.innerText = 'Light';

    }
}
// ====================> Screen lock <===============================
let screenLock = null;

function isScreenLockSupported() {
    return ('wakeLock' in navigator);
}
async function getScreenLock() {
    if (isScreenLockSupported()) {
        let screenLock;
        try {
            screenLock = await navigator.wakeLock.request('screen');
        } catch (err) {
            console.log(err.name, err.message);
        }
        return screenLock;
    }
}

function release() {
    if (typeof screenLock !== "undefined" && screenLock != null) {
        screenLock.release()
            .then(() => {
                console.log("Lock released 🎈");
                screenLock = null;
            });
    }
}


// ====================> dodo <===============================
var DoDoRoundsElement = document.getElementById('dodo-rounds');
var dodoTimeElement = document.getElementById('dodo-time');

var dodoCalculateButton = document.getElementById('dodo-calculate-time');
var dodoRequiredTimeDisplay = document.getElementById('dodo-required-time');
var DoDOStartButton = document.getElementById('dodo-start-exercise');
var dodoStopButton = document.getElementById('dodo-stop');

var DoDoRoundsDisplay = document.getElementById('dodo-round-diaplay');
var dodoTimeDisplay = document.getElementById('dodo-display-time');
var dodoDirectionDisplay = document.getElementById('dodo-direction');

var dodoTotalSeconds;
var DoDoRounds;
var dodoTime;

var Doing = 0;
var Stop = 0;

function dodoCalculateTime() {
    console.log(DoDoRoundsElement.value);
    DoDoRounds = parseInt(DoDoRoundsElement.value);
    dodoTime = parseInt(dodoTimeElement.value);
    if (isNaN(DoDoRounds) || isNaN(dodoTime)) {
        console.log("not na number");
        alert("enter number")
    }
    totalSeconds = 2 * DoDoRounds * dodoTime;
    minutes = Math.floor(totalSeconds / 60);
    seconds = totalSeconds % 60;
    // console.log();
    dodoRequiredTimeDisplay.innerText = " 0" + minutes + " : " + seconds;
}

dodoCalculateButton.addEventListener('click', dodoCalculateTime);



// function wait(s) {
//     start = Date.now();
//     now = start;
//     while (now <= start + s * 1000) {
//         now = Date.now();
//     }
// }

async function startdodo() {
    if (Doing == 0) {
        screenLock = await getScreenLock();
        Doing = 1;
        Stop = 0;
        for (let currentRound = 1; currentRound <= DoDoRounds; currentRound++) {
            DoDoRoundsDisplay.innerText = currentRound;
            for (let s = 1; s <= dodoTime; s++) {
                dodoTimeDisplay.innerText = s;
                // wait(1);
                if(Stop == 1){
                    Doing=0;
                    return
                }
                await new Promise(done => setTimeout(() => done(), 1000));
            }
            play();
            dodoDirectionDisplay.classList.toggle('rotate__180');
            // play sound
            console.log("play sound");
            for (let s = 1; s <= dodoTime; s++) {
                // wait(1);
                if(Stop == 1){
                    Doing=0;
                    return
                }
                dodoTimeDisplay.innerText = s;
                await new Promise(done => setTimeout(() => done(), 1000));
            }
            play();
            // play sound
            console.log("play sound");
            dodoDirectionDisplay.classList.toggle('rotate__180');
            Doing = 0;
            release();
        }
    }
}


function play() {
    audioUrl = String.raw`assets\audio\pinwheel.mp3`
    var audio = new Audio(audioUrl);
    audio.play();
}

DoDOStartButton.addEventListener('click', startdodo)

dodoStopButton.addEventListener('click', ()=>{
    Stop = 1;

})
console.log("end");

// ====================> dorest <===============================
var doRestRoundsElement = document.getElementById('do-rest-rounds');
var doRestDoTimeElement = document.getElementById('dorest-do-time');
var doRestRestTimeElement = document.getElementById('dorest-rest-time');

var doRestCalculateButton = document.getElementById('dorest-calculate-time');
var doRestRequiredTimeDisplay = document.getElementById('dorest-required-time');
var doRestStartButton = document.getElementById('dorest-start-exercise');
var doRestStopButton = document.getElementById('dorest-stop');

var doRestRoundsDisplay = document.getElementById('dorest-round-diaplay');
var doRestTimeDisplay = document.getElementById('dorest-display-time');
var doRestDirectionDisplay = document.getElementById('dorest-direction');

var doRestTotalSeconds;
var doRestRounds;
var doRestDo;
var doRestRest;

function doRestCalculateTime() {
    console.log(doRestRoundsElement.value);
    doRestRounds = parseInt(doRestRoundsElement.value);
    doRestDo = parseInt(doRestDoTimeElement.value);
    doRestRest = parseInt(doRestRestTimeElement.value);
    if (isNaN(doRestRounds) || isNaN(doRestDo)|| isNaN(doRestRest)) {
        console.log("not na number");
        alert("enter number")
    }
    totalSeconds = doRestRounds * (doRestDo + doRestRest);
    minutes = Math.floor(totalSeconds / 60);
    seconds = totalSeconds % 60;
    // console.log();
    doRestRequiredTimeDisplay.innerText = " 0" + minutes + " : " + seconds;
}

doRestCalculateButton.addEventListener('click', doRestCalculateTime);

async function startDoRest() {
    if (Doing == 0) {
        screenLock = await getScreenLock();
        Doing = 1;
        Stop = 0;
        for (let currentRound = 1; currentRound <= doRestRounds; currentRound++) {
            doRestRoundsDisplay.innerText = currentRound;
            for (let s = 1; s <= doRestDo; s++) {
                doRestTimeDisplay.innerText = s;
                // wait(1);
                if(Stop == 1){
                    Doing=0;
                    return
                }
                await new Promise(done => setTimeout(() => done(), 1000));
            }
            play();
            doRestDirectionDisplay.classList.toggle('rotate__90');
            // play sound
            console.log("play sound");
            for (let s = 1; s <= doRestRest; s++) {
                // wait(1);
                if(Stop == 1){
                    Doing=0;
                    return
                }
                doRestTimeDisplay.innerText = s;
                await new Promise(done => setTimeout(() => done(), 1000));
            }
            play();
            // play sound
            console.log("play sound");
            doRestDirectionDisplay.classList.toggle('rotate__90');
            Doing = 0;
            release();
        }
    }
}

doRestStartButton.addEventListener('click', startDoRest)

doRestStopButton.addEventListener('click', ()=>{
    Stop = 1;
})