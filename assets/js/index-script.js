// ====================> mode <===============================
var modeButton = document.getElementById('mode')

document.body.classList.add('dark-mode');
modeButton.innerText = "Light";

modeButton.addEventListener('click', toggleMode);

function toggleMode(){
    document.body.classList.toggle('dark-mode');
    if(modeButton.innerText == 'Light'){
        modeButton.innerText = 'Dark';
    }
    else{
        modeButton.innerText = 'Light';

    }
}

// ====================> cat n cow <===============================
var catRoundsElement = document.getElementById('cat-rounds');
var catTimeElement = document.getElementById('cat-time');

var catCalculateButton = document.getElementById('cat-calculate-time');
var catRequiredTimeDisplay = document.getElementById('cat-required-time');
var catStartButton = document.getElementById('cat-start-exercise');

var catRoundsDisplay = document.getElementById('cat-round-diaplay');
var catTimeDisplay = document.getElementById('cat-display-time');
var catDirectionDisplay = document.getElementById('cat-direction');

var catTotalSeconds;
var catRounds;
var catTime;

function catCalculateTime(){
    console.log(catRoundsElement.value);
    catRounds = parseInt(catRoundsElement.value);
    catTime = parseInt(catTimeElement.value);
    if(isNaN(catRounds) || isNaN(catTime)){
        console.log("not na number");
        alert("enter number")
    }
    totalSeconds = 2*catRounds*catTime;
    minutes = Math.floor(totalSeconds/60);
    seconds = totalSeconds%60;
    // console.log();
    catRequiredTimeDisplay.innerText = " 0" + minutes + " : " + seconds;
}

catCalculateButton.addEventListener('click', catCalculateTime);


function wait(s){
    start = Date.now();
    now = start;
    while (now <= start + s*1000){
        now = Date.now();
    }
}

async function startCat() {
    for (let currentRound = 1; currentRound <= catRounds; currentRound++) {
        catRoundsDisplay.innerText = currentRound;
        for (let s = 1; s <= catTime; s++) {
            catTimeDisplay.innerText = s;
            // wait(1);
            await new Promise(done => setTimeout(() => done(), 1000));
        }
        catDirectionDisplay.classList.toggle('rotate__180');
        play();
        // play sound
        console.log("play sound");
        for (let s = 1; s <= catTime; s++) {
            // wait(1);
            catTimeDisplay.innerText = s;
            await new Promise(done => setTimeout(() => done(), 1000));
        }
        play();
        // play sound
        console.log("play sound");
        catDirectionDisplay.classList.toggle('rotate__180');


    }  
}
function play() {
    audioUrl = String.raw`assets\audio\pinwheel.mp3`
    var audio = new Audio(audioUrl);
      audio.play();
    }
catStartButton.addEventListener('click', startCat)
console.log("end");

