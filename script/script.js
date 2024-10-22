const startBtn = document.getElementById("startGameBtn");
const gameContainer = document.getElementById("gameContainer");
const topScoreContainer = document.getElementById("topScoreContainer");
const historyUL = document.getElementById("historyUL");
const endScore = document.getElementById("endScore");
const easyBtn = document.getElementById("easy");
const mediumBtn = document.getElementById("medium");
const hardBtn = document.getElementById("hard");
const randomBtn = document.getElementById("random");
let score = 0;
let timer = 10;
let gameActive = false;
let sqeareInterval;
let topScore = localStorage.getItem("topScore");
let history = JSON.parse(localStorage.getItem("history"));
let squareHeight = "100px";
let squareWidth = "100px";
let randomMode = false;

setTopScore();
setHistory();
startBtn.addEventListener("click", startGame);
easyBtn.addEventListener("click", setEasy);
mediumBtn.addEventListener("click", setMedium);
hardBtn.addEventListener("click", setHard);
randomBtn.addEventListener("click", setRandom);

function getRandomPositin() {
  const maxX = gameContainer.clientWidth - parseInt(squareWidth);
  const maxY = gameContainer.clientHeight - parseInt(squareHeight);
  const x = Math.floor(Math.random() * maxX);
  const y = Math.floor(Math.random() * maxY);
  return { x, y };
}

function createSquare() {
  const square = document.createElement("div");
  square.classList.add("square");
  if (randomMode) {
    squareHeight = getRandomSize();
    squareWidth = getRandomSize();
    square.style.height = squareHeight;
    square.style.width = squareWidth;
  } else {
    square.style.height = squareHeight;
    square.style.width = squareWidth;
  }
  square.style.background = getRandomGradient();
  const { x, y } = getRandomPositin();
  square.style.left = `${x}px`;
  square.style.top = `${y}px`;

  square.addEventListener("click", () => {
    if (gameActive) {
      score++;
      updateScore();
      square.remove();
      createSquare();
    }
  });
  gameContainer.appendChild(square);
}

function updateScore() {
  document.getElementById("score").textContent = `Score: ${score}`;
}

function updateTimer() {
  document.getElementById("timer").textContent = `Time: ${timer}`;
}

function startGame() {
  startBtn.style.display = "none";
  endScore.style.display = "none";

  gameActive = true;
  score = 0;
  timer = document.getElementById("duration").value || 10;

  updateScore();
  setTopScore();
  updateTimer();

  sqeareInterval = setInterval(() => {
    console.log("ok");
    if (timer > 0) {
      timer--;
      updateTimer();
    } else {
      endGame();
    }
  }, 1000);

  createSquare();
}

function clearGameContainer() {
  gameContainer.lastElementChild.remove();
}

function endGame() {
  clearInterval(sqeareInterval);
  clearGameContainer();
  gameActive = false;
  updateHistory();
  setTopScore();
  showEndScore();
  updateLocalStorage();
  startBtn.style.display = "block";
}

function setTopScore() {
  if (score > topScore) {
    topScore = score;
    topScoreContainer.textContent = `CORNGRATS! NEW TOP SCORE: ${topScore}`;
  } else {
    topScoreContainer.textContent = `Top Score: ${topScore || "0"}`;
  }
}

function updateHistory() {
  history.push(score);
  if (history.length > 10) history.shift();
  setHistory();
}

function showEndScore() {
  endScore.textContent = `Гра закінченна! Ваш рахунок: ${score}`;
  endScore.style.display = "block";
}

function updateLocalStorage() {
  localStorage.setItem("topScore", topScore);
  localStorage.setItem("history", JSON.stringify(history));
}

function setHistory() {
  let ul = ``;
  if (history) {
    for (let i = history.length - 1; i >= 0; i--) {
      ul += `<li>Score: ${history[i]}</li>`;
    }
  } else {
    history = [];
  }

  historyUL.innerHTML = ul;
}

function setEasy() {
  const EASY_SIZE = "200px";
  squareWidth = EASY_SIZE;
  squareHeight = EASY_SIZE;
  randomMode = false;
  mediumBtn.classList.remove("active");
  hardBtn.classList.remove("active");
  randomBtn.classList.remove("active");
  easyBtn.classList.add("active");
}

function setMedium() {
  const MEDIUM_SIZE = "100px";
  squareWidth = MEDIUM_SIZE;
  squareHeight = MEDIUM_SIZE;
  randomMode = false;
  easyBtn.classList.remove("active");
  hardBtn.classList.remove("active");
  randomBtn.classList.remove("active");
  mediumBtn.classList.add("active");
}

function setHard() {
  const HARD_SIZE = "50px";
  squareWidth = HARD_SIZE;
  squareHeight = HARD_SIZE;
  randomMode = false;
  easyBtn.classList.remove("active");
  mediumBtn.classList.remove("active");
  randomBtn.classList.remove("active");
  hardBtn.classList.add("active");
}

function setRandom() {
  randomMode = true;
  easyBtn.classList.remove("active");
  mediumBtn.classList.remove("active");
  hardBtn.classList.remove("active");
  randomBtn.classList.add("active");
}

function getRandomSize() {
  return Math.floor(Math.random() * (500 - 5 + 1)) + 5 + "px";
}

function getRandomGradient() {
  const red1 = Math.floor(Math.random() * 256);
  const green1 = Math.floor(Math.random() * 256);
  const blue1 = Math.floor(Math.random() * 256);
  const alpha1 = (Math.random() * 0.7 + 0.3).toFixed(2);

  const red2 = Math.floor(Math.random() * 256);
  const green2 = Math.floor(Math.random() * 256);
  const blue2 = Math.floor(Math.random() * 256);
  const alpha2 = (Math.random() * 0.7 + 0.3).toFixed(2);

  const angle = Math.floor(Math.random() * 360);

  return `linear-gradient(${angle}deg, rgba(${red1}, ${green1}, ${blue1}, ${alpha1}), rgba(${red2}, ${green2}, ${blue2}, ${alpha2}))`;
}
