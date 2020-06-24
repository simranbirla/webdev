const video = document.getElementById("video");
const play = document.getElementById("play");
const stoped = document.getElementById("stop");
const progress = document.getElementById("progress");
const timestamp = document.getElementById("timestamp");
const half = document.getElementById("half");
const same = document.getElementById("same");
const morehalf = document.getElementById("morehalf");
const double = document.getElementById("double");
const rate = document.querySelectorAll("li");
//Toggle between play and pause
function toggleVideoStatus() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

//update Icon for pause and play
function updateIcon() {
  if (video.paused) {
    play.innerHTML = `<i class="fa fa-pause fa-2x"></i>`;
  } else {
    play.innerHTML = `<i class="fa fa-play fa-2x"></i>`;
  }
}

//Stop function
function stopVideo() {
  video.currentTime = 0;
  video.pause();
}

//Update Progress bar and timestamp
function updateProgress() {
  progress.value = (video.currentTime / video.duration) * 100;

  //set timestamp
  //set minutes
  let mins = Math.floor(video.currentTime / 60);
  if (mins < 10) {
    mins = "0" + String(mins);
  }

  //get seconds
  let secs = Math.floor(video.currentTime % 60);
  if (secs < 10) {
    secs = "0" + String(secs);
  }
  timestamp.innerHTML = `${mins}:${secs}`;
}

function setVideoProgress() {
  video.currentTime = (+progress.value * video.duration) / 100;
}

//update class
function updateClass(type) {
  for (let i = 0; i < rate.length; i++) {
    if (rate[i].className === "selected") {
      rate[i].classList.remove("selected");
    }
  }
  type.classList.add("selected");
}
//Event listners
//video element
video.addEventListener("click", toggleVideoStatus);
video.addEventListener("play", updateIcon);
video.addEventListener("pause", updateIcon);
video.addEventListener("timeupdate", updateProgress);

//Button elements
play.addEventListener("click", toggleVideoStatus);

stoped.addEventListener("click", stopVideo);

progress.addEventListener("change", setVideoProgress);

//Playback events
half.addEventListener("click", (e) => {
  video.playbackRate = 0.5;
  updateClass(e.target);
});

same.addEventListener("click", (e) => {
  video.playbackRate = 1;
  updateClass(e.target);
});

morehalf.addEventListener("click", (e) => {
  video.playbackRate = 1.5;
  updateClass(e.target);
});

double.addEventListener("click", (e) => {
  video.playbackRate = 2;
  updateClass(e.target);
});
