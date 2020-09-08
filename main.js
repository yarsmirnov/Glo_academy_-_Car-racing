`use strict`;

const score = document.querySelector(`.score`);
const start = document.querySelector(`.start`);
const gameArea = document.querySelector(`.game-area`);

const Setting = {
  START: false,
  SCORE: 0,
  SPEED: 3,
};

const keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowRight: false,
  ArrowLeft: false,
};

const createPlayer = function () {
  const car = document.createElement(`div`);
  car.classList.add(`car`);
  gameArea.appendChild(car);
};

const startGame = function () {
  start.classList.add('hidden');
  Setting.START = true;
  createPlayer();
  requestAnimationFrame(playGame);
};

const playGame = function () {
  if (Setting.START) {
    requestAnimationFrame(playGame);
  }
};

const startRun = function (evt) {
  evt.preventDefault();
  keys[evt.key] = true;
  console.log(evt.key);
};

const stopRun = function (evt) {
  evt.preventDefault();
  keys[evt.key] = false;
};

start.addEventListener(`click`, startGame);
document.addEventListener(`keydown`, startRun);
document.addEventListener(`keyup`, stopRun);

