let audio = document.createElement("audio");
let musics = [
  "./musics/Gigi Adwa.mp3",
  "./musics/Fkradiss nekatibeb.mp3",
  "./musics/Yehunie Belay   ይሁኔ በላይ  አደላላታለሁ   Adelalatalehu.mp3",
  "./musics/Abdu Kiar  Merkato Sefere.mp3",
  "./musics/Teddy Tadesse (Yebahir fert nesh).m4a",
];
let index = 0;
let isPlaying = false;

addEventListener("DOMContentLoaded", () => {
  nameWriter();
});
function nameWriter() {
  select(".numberOfArtist").innerHTML = `Playing ${index + 1} out of ${
    musics.length
  }`;
  select(".artistName").innerHTML = musics[index]
    .replace("./musics/", "")
    .replace(".mp3", "");
}

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

// addEventListener("keydown", next);
// addEventListener("keyup", back);
// addEventListener("keypress", toggler);

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
  nameWriter();
  audio.play();
  isPlaying = true;
}
function pause() {
  audio.pause();
  isPlaying = false;
}
function next() {
  nameWriter();
  if (index == musics.length - 1) {
    index = 0;
  } else {
    index = index + 1;
  }
  audio.src = musics[index];
  isPlaying ? play() : pause();
}
function back() {
  nameWriter();
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
  volumeIconizer();
}

function volumeIconizer() {
  if (select(".volumeRange").value == 0) {
    select(
      ".volumeLabel"
    ).innerHTML = `<svg width="35" height="35" fill="var(--gray-color)" viewBox="0 0 20 20">
<path fill-rule="evenodd" d="M8.717 5.55A.5.5 0 019 6v8a.5.5 0 01-.812.39L5.825 12.5H3.5A.5.5 0 013 12V8a.5.5 0 01.5-.5h2.325l2.363-1.89a.5.5 0 01.529-.06zm7.137 1.596a.5.5 0 010 .708l-4 4a.5.5 0 01-.708-.708l4-4a.5.5 0 01.708 0z" clip-rule="evenodd"/>
<path fill-rule="evenodd" d="M11.146 7.146a.5.5 0 000 .708l4 4a.5.5 0 00.708-.708l-4-4a.5.5 0 00-.708 0z" clip-rule="evenodd"/>
</svg>`;
  } else if (select(".volumeRange").value <= 50) {
    select(
      ".volumeLabel"
    ).innerHTML = `<svg width="35" height="35" fill="var(--gray-color)" viewBox="0 0 20 20">
<path fill-rule="evenodd" d="M10.717 5.55A.5.5 0 0111 6v8a.5.5 0 01-.812.39L7.825 12.5H5.5A.5.5 0 015 12V8a.5.5 0 01.5-.5h2.325l2.363-1.89a.5.5 0 01.529-.06z" clip-rule="evenodd"/>
<path d="M12.707 13.182A4.486 4.486 0 0014.025 10a4.486 4.486 0 00-1.318-3.182L12 7.525A3.489 3.489 0 0113.025 10c0 .966-.392 1.841-1.025 2.475l.707.707z"/>
</svg>`;
  } else {
    select(
      ".volumeLabel"
    ).innerHTML = `<svg width="35" height="35" fill="var(--gray-color)" viewBox="0 0 20 20">
        <path d="M13.536 16.01a8.473 8.473 0 002.49-6.01 8.473 8.473 0 00-2.49-6.01l-.708.707A7.476 7.476 0 0115.025 10c0 2.071-.84 3.946-2.197 5.303l.708.707z" />
        <path d="M12.121 14.596A6.48 6.48 0 0014.025 10a6.48 6.48 0 00-1.904-4.596l-.707.707A5.483 5.483 0 0113.025 10a5.483 5.483 0 01-1.61 3.89l.706.706z" />
        <path d="M10.707 13.182A4.486 4.486 0 0012.025 10a4.486 4.486 0 00-1.318-3.182L10 7.525A3.489 3.489 0 0111.025 10c0 .966-.392 1.841-1.025 2.475l.707.707z" />
        <path
          fill-rule="evenodd"
          d="M8.717 5.55A.5.5 0 019 6v8a.5.5 0 01-.812.39L5.825 12.5H3.5A.5.5 0 013 12V8a.5.5 0 01.5-.5h2.325l2.363-1.89a.5.5 0 01.529-.06z"
          clip-rule="evenodd"
        />
      </svg>`;
  }
}
