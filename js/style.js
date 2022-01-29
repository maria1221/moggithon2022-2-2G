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