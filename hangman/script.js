const wordEl = document.getElementById("word");
const wrongLettersEl = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");
const finalMessageRevealWord = document.getElementById(
  "final-message-reveal-word"
);

const figureParts = document.querySelectorAll(".figure-part");

const words = ["application", "programming", "interface", "india", "Germany"]; //array of words to be selected from
let selectedword = words[Math.floor(Math.random() * words.length)]; //randomly select words from array

const correctLetters = [];
const wrongLetters = [];

//displaay the word to be guessed
function displayWord() {
  wordEl.innerHTML = `${selectedword
    .split("")
    .map((letter) => {
      return `<span class="letter">${
        correctLetters.includes(letter) ? letter : ""
      }</span>`;
    })
    .join("")}`;
  const innerWord = wordEl.innerText.replace(/\n/g, "");
  if (innerWord === selectedword) {
    finalMessage.innerText = "You won";
    popup.style.display = "flex";
    playable = false;
  }
}
displayWord();
let playable = true; //So that the game ends when you lose or win

//update Wrong letters display
function updateWrongLetters() {
  wrongLettersEl.innerHTML = `${wrongLetters.length > 0 ? "<p>Wrong</p>" : ""}
  ${wrongLetters.map((let) => {
    return `<span>${let}</span>`;
  })}`;

  //To show the hangman
  figureParts.forEach((part, index) => {
    if (index < wrongLetters.length) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });

  //When the whole figured is displayed you lose
  if (figureParts.length === wrongLetters.length) {
    finalMessage.innerText = "You Lost";
    popup.style.display = "flex";
    playable = false;
  }
}
//Show the notification of alreday entered letter
function showNotification() {
  notification.classList.add("show");
  //Re,oves the popup after sometime
  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
}
//Keyboard press to enter the letter

window.addEventListener("keydown", (e) => {
  if (playable) {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
      const letter = e.key;
      //If letter in the word to be guessed
      if (selectedword.includes(letter)) {
        //Letter not repeats
        if (!correctLetters.includes(letter)) {
          correctLetters.push(letter);
          displayWord();
        } else {
          showNotification();
        }
      } else {
        //Wrong letter notification
        if (!wrongLetters.includes(letter)) {
          //Letter not repeats
          wrongLetters.push(letter);
          updateWrongLetters();
        } else {
          showNotification();
        }
      }
    } else {
      alert("Not a letter");
    }
  }
});

//play AGain button
playAgainBtn.addEventListener("click", () => {
  playable = true; //Play possible
  //Empty the arrays
  correctLetters.splice(0);
  wrongLetters.splice(0);
  popup.style.display = "none";
  selectedword = words[Math.floor(Math.random() * words.length)];
  displayWord();
  updateWrongLetters();
});
