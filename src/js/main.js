const plane = document.querySelector('.plane');
const planeElement = document.querySelector('#plane-img');
const countDownNumber = document.querySelector('.countdown__number');
const startSection = document.querySelector('.start-section');
const startBtn = document.querySelector('.start');
const fireBtn = document.querySelector('.fire');

const numberOfPlanes = 15;
const roundTime = 5;


const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min) + min);
const coinFlip = (heads, tails) => Math.random() < 0.5 ? heads : tails;

const countdownTimer = (() => {
  let id;
  let count = 0;
  const start = (callback, secondsCallback, seconds) => {
    count = seconds;
    id = setInterval(() => {
      if (count < 1 ) {
        clearInterval(id);
        callback();
      } else {
        count--;
        secondsCallback(count);
      }
    }, 1000)
  }
  const stop = () => {
    if (id) {
      clearInterval(id)
    }
  }
  return {start, stop, count}
})();

function generateRandomPlane(planeImgElement){
  const imageIndex = getRandomInt(1, numberOfPlanes).toString().padStart(3, "0");
  const faction = coinFlip('allies', 'axis');
  const imagePath = `images/${faction}/${faction}_plane_${imageIndex}.jpg`;
  const deg = getRandomInt(0, 90);
  const blur = getRandomInt(0, 3);
  const size = getRandomInt(100, 400);
  const flip = coinFlip( -1, 1);
  
  planeImgElement.dataset.faction = faction;
  planeImgElement.src = imagePath;
  planeImgElement.style.transform = `scaleX(${flip}) rotate(${deg}deg)`;
  planeImgElement.style.filter = `blur(${blur}px)`;
  planeImgElement.style.height = `${size}px`;
}

function onStart() {
  startSection.classList.add('hidden');
  startRound(roundTime);
}

function onCountDownTimeout() {
  startRound(roundTime);
}

function onSecondsTimeout(count) {
  countDownNumber.innerText = count;
}

function startRound(seconds) {
  countDownNumber.innerText = seconds;
  countdownTimer.stop();
  generateRandomPlane(planeElement)
  countdownTimer.start(onCountDownTimeout, onSecondsTimeout, seconds)
  
  // let count = roundSeconds;
  // countDownNumber.innerText = count;
  // const id = setInterval(() => {
  //   if (count < 1 ) {
  //     clearInterval(id);
  //     startRound();
  //   } else {
  //     count--;
  //     countDownNumber.innerText = count;
  //   }
  // }, 1000);
}


function isFriend(plane){
  return plane && plane.dataset.faction === 'allies';
}

function onFired() {
  if (isFriend(planeElement)) {
    console.log('friendly fire!')
  } else {
    console.log('hit!')
  }
  startRound(roundTime)
}

startBtn.addEventListener('click', onStart);
fireBtn.addEventListener('click', onFired)


//make countdown timer object
//make game object


/*
start game 
rounds = 0
score = 0
strikes = 0


start round
generate random image path from random directory and image number 
create img element for image
get random rotation 0-90deg
get random blur value 0-3
get random size 100-400px
flip -1 or 1

 */