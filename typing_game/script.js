const word = document.getElementById("word");
const text = document.getElementById("text");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const endgameEl = document.getElementById("end-game-container");
const settingsBtn = document.getElementById("setting-btn");
const settings = document.getElementById("settings");
const settingsForm = document.getElementById("settings-form");
const difficultySelect = document.getElementById("difficulty");

const words = [
  "compute",
  "superficial",
  "abstinace",
  "absentia",
  "lost",
  "found",
  "warrior",
  "interface",
  "data",
  "object",
  "window",
  "linux",
  "networking",
  "cloud",
  "architechture",
  "resilient",
  "actuaries",
  "bonus",
  "castle",
  "caterpillar",
  "butterfly",
  "decentralization",
  "decapitalize",
  "eager",
  "energetic",
  "fool",
  "faux",
  "fanthom",
  "gothic",
  "goddess",
  "hitman",
  "highlighter",
  "humongous",
  "iteration",
  "irony",
  "joker",
  "jacked",
  "kangaroo",
  "knighthood",
  "kaleidoscope",
  "louge",
  "loving",
  "manage",
  "monkey",
  "noctornal",
  "zebra",
  "oculus",
];

//Init time
let time = 10;

//init score
let score = 0;

//init word
let randomWord;

//focus on text on start
text.focus();

//timer start counting down
const timeInterval = setInterval(updateTime, 1000);

//fucntion for generating random word
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

//Update the time element in DOM
function updateTime() {
  time--;
  timeEl.innerHTML = time;
  if (time == 0) {
    clearInterval(timeInterval);
    // end the game
    gameOver();
  }
}

//Add the word to DOM
function addDOM() {
  randomWord = getRandomWord();
  word.innerHTML = randomWord;
}

//Update the score aftre right answer
function updateScores() {
  score++;
  scoreEl.innerHTML = score;
}

addDOM();

//Game Over function
function gameOver() {
  endgameEl.innerHTML = ` <h2>Game is over </h2>
    <h3> Your score is ${score}</h3>
    <button onclick="location.reload()">Reload</button>
    `;
  endgameEl.style.display = "flex";
}

text.addEventListener("input", (e) => {
  const written = text.value;
  if (randomWord === written) {
    addDOM();

    //after successful clear the text area
    text.value = "";

    //update scores
    updateScores();
    if (level === "easy") {
      time += 6;
    } else if (level === "medium") {
      time += 4;
    } else {
      time += 3;
    }

    updateTime();
  }
});

//setting value of the difficulty
let level =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "easy";

//Show to the DOM
difficultySelect.value = level;
difficultySelect.addEventListener("change", () => {
  level = difficultySelect.value;
  localStorage.setItem("difficulty", level);
});

settingsBtn.addEventListener("click", () => {
  settings.classList.toggle("hide");
});
