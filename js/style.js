// querySelector あらゆるHTML要素を取得できる
// song というクラスが付いた要素を取得
const song = document.querySelector(".song");
const play = document.querySelector(".play");
const replay = document.querySelector(".replay");
const outline = document.querySelector(".moving-outline circle");
const video = document.querySelector(".vid-container video");
//Sounds
const sounds = document.querySelectorAll(".sound-picker button");
//Time Display
const timeDisplay = document.querySelector(".time-display");
const outlineLength = outline.getTotalLength();
//Duration
const timeSelect = document.querySelectorAll(".time-select button");
let fakeDuration = 600;

outline.style.strokeDashoffset = outlineLength;
outline.style.strokeDasharray = outlineLength;
timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(
fakeDuration % 60
)}`;

// 時間の設定
timeSelect.forEach(option => {
    option.addEventListener("click", function() {
      fakeDuration = this.getAttribute("data-time");
      timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(
        fakeDuration % 60
      )}`;
    });
  });

// 右のボタンをクリックしたときに音楽を流す
sounds.forEach(sound => {
  sound.addEventListener("click", function() {
    // song のsrc属性を＝以下に設定
    // src属性 画像などの読み込み元を指定するための属性
    // this は sounds つまり、sound-pickerというクラスが付いたボタンタグのこと
    //getAttribute 指定した属性の値を含む文字列が返される
    song.src = this.getAttribute("data-sound");  // クリックしたボタンに応じて雨か波の音か設定
    video.src = this.getAttribute("data-video"); 
    checkPlaying(song);
  });
});

// 音楽を流す関数
const checkPlaying = song => {
  if (song.paused) {
    // .paused メディア要素が一時停止しているかどうかを示す
    // .play メディアの再生を開始する
    song.play();
    video.play();
    // 中央のボタンが停止ボタンになる
    play.src = "./svg/pause.svg";
  } else {
    song.pause();
    video.pause();
    // 中央のボタンが再生ボタンになる
    play.src = "./svg/play.svg";
  }
};

//playボタンクリック時に発火、音楽
play.addEventListener("click", function() {
  checkPlaying(song);
});

//リスタートボタン
 //クリック時に発火
 //リスタートソングの内容
replay.addEventListener("click", function() {
    restartSong(song);
  });

const restartSong = song =>{
    let currentTime = song.currentTime;
    song.currentTime = 0;
    console.log("ciao")
}


const checkPlaying = song => {
  if (song.paused) {   //再生する
    song.play();
    video.play();
    play.src = "./svg/pause.svg";  //停止するボタン表示
  } else {
    song.pause();       //停止する
    video.pause();
    play.src = "./svg/play.svg";   //再生するボタン表示
  }
};

song.ontimeupdate = function() {
  let currentTime = song.currentTime;
  let elapsed = fakeDuration - currentTime; // 設定時間ー経過時間
  let seconds = Math.floor(elapsed % 60);   // ↑の値を1分（６０秒）で割った余り → 秒数
  let minutes = Math.floor(elapsed / 60);   // ↑の値を６０秒で割った余り → 分
  timeDisplay.textContent = `${minutes}:${seconds}`; //↑で定義した`分:秒`を表示
  let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
  outline.style.strokeDashoffset = progress;

  if (currentTime >= fakeDuration) {    //ここで停止条件
    song.pause();
    song.currentTime = 0;
    play.src = "./svg/play.svg";
    video.pause();
  }
};