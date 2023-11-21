let audio = document.createElement("audio");
let musics = [
  "./musics/1.mp3",
  "./musics/2.mp3",
  "./musics/3.mp3",
  "./musics/4.mp3",
  "./musics/5.mp3",
  "./musics/6.mp3",
  "./musics/7.mp3",
];
let index = 0;
let isPlaying = false;

audio.src = musics[index];

audio.addEventListener("ended", () => {
  next();
});

setInterval(() => {
  durationer();
}, 1000);
function select(name) {
  return document.querySelector(name);
}

addEventListener("keydown", next);
addEventListener("keyup", back);
addEventListener("keypress", toggler);

function toggler() {
  if (isPlaying) {
    pause();
    select(".buttonPlayPause").classList.remove("buttonPause");
    select(".buttonPlayPause").classList.add("buttonPlay");
  } else {
    play();
    select(".buttonPlayPause").classList.add("buttonPause");
    select(".buttonPlayPause").classList.remove("buttonPlay");
  }
}

function play() {
  audio.play();
  isPlaying = true;
}
function pause() {
  audio.pause();
  isPlaying = false;
}
function next() {
  if (index == musics.length - 1) {
    index = 0;
  } else {
    index = index + 1;
  }
  audio.src = musics[index];
  isPlaying ? play() : pause();
}
function back() {
  if (index == 0) {
    index = musics.length - 1;
  } else {
    index = index - 1;
  }
  audio.src = musics[index];
  isPlaying ? play() : pause();
}

function durationer() {
  //For Duration and current time
  let currentMinute = Math.floor(audio.currentTime / 60);
  let currentSecond = Math.floor(audio.currentTime - currentMinute * 60);
  select(".currentTime").textContent =
    zeroAdder(currentMinute) + ":" + zeroAdder(currentSecond);

  let durationMinute = Math.floor(audio.duration / 60);
  let durationSecond = Math.floor(audio.duration - durationMinute * 60);

  select(".duration").textContent =
    zeroAdder(durationMinute) + ":" + zeroAdder(durationSecond);

  select(".timeRange").value = audio.currentTime * (100 / audio.duration);
}

function seekTime() {
  audio.currentTime = select(".timeRange").value * (audio.duration / 100);
}

function zeroAdder(value) {
  return value > 10 ? value : `0${value}`;
}

function seekVolume() {
  audio.volume = select(".volumeRange").value / 100;
  console.log(select(".volumeRange").value / 100);
}
