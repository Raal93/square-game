const startBtn = document.getElementById("startGameBtn");
const gameContainer = document.getElementById("gameContainer");
const topScoreContainer = document.getElementById("topScoreContainer");
const historyUL = document.getElementById("historyUL");
const endScore = document.getElementById("endScore");
let score = 0;
let timer = 10;
let gameActive = false;
let sqeareInterval;
let topScore = localStorage.getItem("topScore");
const history = [];

setTopScore();
setHistory();
startBtn.addEventListener("click", startGame);

function getRandomPositin() {
  const maxX = gameContainer.clientWidth - 50;
  const maxY = gameContainer.clientHeight - 50;
  const x = Math.floor(Math.random() * maxX);
  const y = Math.floor(Math.random() * maxY);
  return { x, y };
}

function createSquare() {
  const square = document.createElement("div");
  square.classList.add("square");
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
    topScoreContainer.textContent = `Top Score: ${topScore}`;
  }
}

function updateHistory() {
  history.push(score);
  setHistory();
}

function showEndScore() {
  endScore.textContent = `Гра закінченна! Ваш рахунок: ${score}`;
  endScore.style.display = "block";
}

function updateLocalStorage() {
  localStorage.setItem("topScore", topScore);
  localStorage.setItem("history", history);
}

function setHistory() {
  let ul = ``;
  for (let i = history.length - 1; i >= 0; i--) {
    ul += `<li>Score: ${history[i]}</li>`;
  }

  historyUL.innerHTML = ul;
}
