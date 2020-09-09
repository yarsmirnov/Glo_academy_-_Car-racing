`use strict`;

// Утилитарные функции
const getQuantityOfElement = function (height) {
  return Math.floor(document.documentElement.clientHeight / height + 2);
};

// Элементы со страницы
const score = document.querySelector(`.score`);
const start = document.querySelector(`.start`);
const gameArea = document.querySelector(`.game-area`);
const car = document.createElement(`div`);

car.classList.add(`car`, `player`);

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
  TRAFFIC: 3,
};


// Работа с интерфейсом

const startGame = function () {
  for (let i = 0; i < getQuantityOfElement(100); i++) {
    const line = document.createElement(`div`);
    line.classList.add(`line`);
    line.style.top = `${(i * 125)}px`;
    line.y = i * 100;
    gameArea.appendChild(line);
  }

  for (let i = 0; i < getQuantityOfElement(100 * Setting.TRAFFIC); i++) {
    const enemy = document.createElement(`div`);
    enemy.classList.add(`car`, `enemy`);
    enemy.y = -100 * Setting.TRAFFIC * (i + 1);
    enemy.style.top = `${enemy.y}px`;
    enemy.style.left = `${Math.floor(Math.random() * (gameArea.offsetWidth - 50))}px`;
    gameArea.appendChild(enemy);
  };

  start.classList.add('hidden');
  Setting.START = true;
  gameArea.appendChild(car);
  Setting.X = car.offsetLeft;
  Setting.Y = car.offsetTop;
  requestAnimationFrame(playGame);
};

const playGame = function () {
  if (Setting.START) {
    moveRoad();
    moveEnemy();

    if (keys.ArrowLeft && Setting.X > 0) {
      Setting.X -= Setting.SPEED;
    }
    if (keys.ArrowRight && Setting.X < (gameArea.offsetWidth - car.offsetWidth)) {
      Setting.X += Setting.SPEED;
    }
    if (keys.ArrowUp && Setting.Y > 0) {
      Setting.Y -= Setting.SPEED;
    }
    if (keys.ArrowDown && Setting.Y < (gameArea.offsetHeight - car.offsetHeight)) {
      Setting.Y += Setting.SPEED;
    }
    car.style.left = `${Setting.X}px`;
    car.style.top = `${Setting.Y}px`;
    requestAnimationFrame(playGame);
  }
};

const moveRoad = function () {
  let lines = document.querySelectorAll(`.line`);
  lines.forEach(function (line) {
    line.y += Setting.SPEED;
    line.style.top = `${line.y}px`;

    if (line.y >= document.documentElement.clientHeight) {
      line.y = -100;
    }
  });
};

const moveEnemy = function () {
  let enemies = document.querySelectorAll(`.enemy`);
  enemies.forEach(function (enemy) {
    enemy.y += Setting.SPEED / 2;
    enemy.style.top = `${enemy.y}px`;

    if (enemy.y >= document.documentElement.clientHeight) {
      enemy.y = -100 * Setting.TRAFFIC;
      enemy.style.left = `${Math.floor(Math.random() * (gameArea.offsetWidth - 50))}px`;
    }
  });

}


// Игровое управление
const startRun = function (evt) {
  evt.preventDefault();
  keys[evt.key] = true;
};

const stopRun = function (evt) {
  evt.preventDefault();
  keys[evt.key] = false;
};


// Обработчики событий
start.addEventListener(`click`, startGame);
document.addEventListener(`keydown`, startRun);
document.addEventListener(`keyup`, stopRun);

