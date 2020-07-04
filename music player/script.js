const musicContainer = document.getElementById("music-container");
const title = document.getElementById("title");
const cover = document.getElementById("cover");
const progressConatiner = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const audio = document.getElementById("audio");

songTitle = ["I won't give up", "Play Date", "Symphony"];
songs = ["mp31.mp3", "mp32.mp3", "mp33.mp3"];
songCovers = ["img1.jpg", "img2.jpg", "img3.jpg"];

//Function for loading songs
function loadSong(index) {
  title.innerText = songTitle[index];
  cover.src = `images/${songCovers[index]}`;
  audio.src = `songs/${songs[index]}`;
}

let songIndex = 2;

loadSong(songIndex);

//function for pausing a song
function pauseSong() {
  musicContainer.classList.remove("play");
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");

  audio.pause();
}

//Play function
function playSong() {
  musicContainer.classList.add("play");
  playBtn.querySelector("i.fas").classList.remove("fa-pause");
  playBtn.querySelector("i.fas").classList.add("fa-play");

  audio.play();
}

//PLay pevious song
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songIndex);
  playSong();
}

//Play next song
function nextSong() {
  songIndex++;
  if (songIndex === songs.length) {
    songIndex = 0;
  }
  loadSong(songIndex);
  playSong();
}

//Update the progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const time = (currentTime / duration) * 100;
  progress.style.width = `${time}%`;
}

//Set the progress bar and change it
function setProgress(e) {
  const width = this.clientWidth;
  console.log(this);
  console.log(e.target);
  const xel = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (xel / width) * duration;
}

//Event Listeners
playBtn.addEventListener("click", () => {
  const isPlaying = musicContainer.classList.contains("play");

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

audio.addEventListener("timeupdate", updateProgress);
progressConatiner.addEventListener("click", setProgress);
audio.addEventListener("ended", nextSong);
