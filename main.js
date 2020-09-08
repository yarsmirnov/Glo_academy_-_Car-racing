`use strict`;

// Элементы со страницы
const score = document.querySelector(`.score`);
const start = document.querySelector(`.start`);
const gameArea = document.querySelector(`.game-area`);


// Глобальные константы и перечисления
const keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowRight: false,
  ArrowLeft: false,
};


// Состояние игры
const Setting = {
  START: false,
  SCORE: 0,
  SPEED: 3,
};


// Работа с интерфейсом
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


// Игровое управление
const startRun = function (evt) {
  evt.preventDefault();
  keys[evt.key] = true;
  console.log(evt.key);
};

const stopRun = function (evt) {
  evt.preventDefault();
  keys[evt.key] = false;
};


// Обработчики событий
start.addEventListener(`click`, startGame);
document.addEventListener(`keydown`, startRun);
document.addEventListener(`keyup`, stopRun);

