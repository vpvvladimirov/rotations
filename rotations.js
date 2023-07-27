let allyField = document.getElementById('ally-field');
let players = document.getElementsByClassName('player');

let setter = document.getElementById('setter');
let middle = document.getElementById('middle');
let outside1 = document.getElementById('outside1');
let libero = document.getElementById('libero');
let outside2 = document.getElementById('outside2');
let opposite = document.getElementById('opposite');

const rotationButtons = document.getElementsByClassName('rotation-button');

const refreshButton = document.getElementById('refresh-button');

document.addEventListener('mousemove', movePlayer);
document.addEventListener('mouseup', stopDragging);

let isDragging = false;
let offset = { x: 0, y: 0 };
let activePlayer;

function attachEventListeners() {
  for (let i = 0; i < players.length; i++) {
    players[i].addEventListener('mousedown', startDragging);
  }
}

const rotationPositions = [
  {
    setter: { left: '330px', top: '250px' },
    middle: { left: '210px', top: '50px' },
    outside1: { left: '330px', top: '50px' },
    libero: { left: '210px', top: '250px' },
    outside2: { left: '80px', top: '250px' },
    opposite: { left: '80px', top: '50px' },
  },
  {
    setter: { left: '420px', top: '320px' },
    middle: { left: '130px', top: '110px' },
    outside1: { left: '350px', top: '270px' },
    libero: { left: '220px', top: '300px' },
    outside2: { left: '70px', top: '270px' },
    opposite: { left: '0px', top: '150px' },
  },
  {
    setter: { left: '42px', top: '320px' },
    middle: { left: '10px', top: '110px' },
    outside1: { left: '350px', top: '270px' },
    libero: { left: '220px', top: '30px' },
    outside2: { left: '70px', top: '270px' },
    opposite: { left: '0px', top: '15px' },
  },
  {
    setter: { left: '420px', top: '320px' },
    middle: { left: '130px', top: '11px' },
    outside1: { left: '350px', top: '270px' },
    libero: { left: '220px', top: '300px' },
    outside2: { left: '70px', top: '270px' },
    opposite: { left: '0px', top: '153px' },
  },
  {
    setter: { left: '420px', top: '320px' },
    middle: { left: '130px', top: '110px' },
    outside1: { left: '390px', top: '270px' },
    libero: { left: '220px', top: '300px' },
    outside2: { left: '90px', top: '270px' },
    opposite: { left: '120px', top: '150px' },
  },
  {
    setter: { left: '420px', top: '320px' },
    middle: { left: '130px', top: '110px' },
    outside1: { left: '950px', top: '270px' },
    libero: { left: '220px', top: '300px' },
    outside2: { left: '70px', top: '270px' },
    opposite: { left: '0px', top: '150px' },
  },
  {
    setter: { left: '420px', top: '320px' },
    middle: { left: '130px', top: '110px' },
    outside1: { left: '350px', top: '270px' },
    libero: { left: '220px', top: '300px' },
    outside2: { left: '70px', top: '270px' },
    opposite: { left: '0px', top: '150px' },
  },
];

function rotatePlayers(rotationIndex) {
  const currentRotation = rotationPositions[rotationIndex];

  for (let i = 0; i < players.length; i++) {
    const playerID = players[i].id;
    const playerPosition = currentRotation[playerID];

    players[i].style.left = playerPosition.left;
    players[i].style.top = playerPosition.top;

    const playerPositionString = `${parseInt(playerPosition.left)},${parseInt(playerPosition.top)}`;
    localStorage.setItem(`player${i + 1}Position`, playerPositionString);
  }

  refreshButton.addEventListener('click', () => {
    rotatePlayers(rotationIndex);
    attachEventListeners();
  });

  for (let i = 0; i < rotationButtons.length; i++) {
    rotationButtons[i].addEventListener('click', () => {
      rotatePlayers(i + 1);
      attachEventListeners();
    });
  }
}

rotatePlayers(0);

function startDragging(e) {
  e.preventDefault();
  isDragging = true;
  activePlayer = this;
  offset.x = e.offsetX;
  offset.y = e.offsetY;
}

function movePlayer(e) {
  e.preventDefault();
  if (!isDragging) return;

  let x = e.clientX - allyField.offsetLeft - offset.x;
  let y = e.clientY - allyField.offsetTop - offset.y;

  let maxX = allyField.clientWidth - activePlayer.offsetWidth;
  let maxY = allyField.clientHeight - activePlayer.offsetHeight;

  x = Math.max(0, Math.min(x, maxX));
  y = Math.max(0, Math.min(y, maxY));

  activePlayer.style.left = x + 'px';
  activePlayer.style.top = y + 'px';
}

function stopDragging() {
  isDragging = false;
  activePlayer = null;

  for (let i = 0; i < players.length; i++) {
    let playerPosition = `${parseInt(players[i].style.left)},${parseInt(players[i].style.top)}`;
    localStorage.setItem(`player${i + 1}Position`, playerPosition);
  }
}