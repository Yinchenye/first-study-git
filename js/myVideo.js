var video_ = document.getElementById("video"); //整个视频播放界面
var jp_play = document.getElementsByClassName("jp-play")[0]; //点击播放图标
var jp_pause = document.getElementsByClassName("jp-pause")[0]; //点击停止播放图标
var jp_seek_bar = document.getElementsByClassName("jp-seek-bar")[0]; //整个进度条
var jp_play_bar = document.getElementsByClassName("jp-play-bar")[0]; //播放的进度条
var span_ = document.getElementsByTagName("span")[1]; //播放按钮图案
var jp_current_time = document.getElementsByClassName("jp-current-time")[0]; //播放当前时间
var jp_duration_time = document.getElementsByClassName("jp-duration")[0]; //播放总的时间
var jp_full_screen = document.getElementsByClassName("jp-full-screen")[0]; //全屏按钮
video_.addEventListener("canplay", function () {
  jp_play.onclick = function () {
    video_.play();
    this.style.display = "none";
    jp_pause.style.display = "block";
  };
  jp_pause.onclick = function () {
    video_.pause();
    this.style.display = "none";
    jp_play.style.display = "block";
  };
  jp_duration_time.innerHTML = format_time(video_.duration);

  video_.addEventListener("timeupdate", function () {
    jp_current_time.innerHTML = format_time(video_.currentTime);
    jp_play_bar.style.width =
      (video_.currentTime / video_.duration) * 100 + "%";
  });

  //   拖拽进度条
  jp_seek_bar.addEventListener("mousedown", function (e) {
    var e = e || window.event;
    var small_ = e.offsetX;
    var all_ = this.offsetWidth;
    var left_1 = this.offsetLeft;
    var box = document.getElementsByClassName("box")[0];
    var left_2 = box.offsetLeft;
    video_.currentTime = (small_ / all_) * video_.duration;
    //   点击进度条
    jp_seek_bar.onclick = function (e) {
      var e = e || window.event;
      var small = e.offsetX;
      var all = this.offsetWidth;
      // jp_play_bar.style.width = (small / all) * 100 + "%";
      // jp_current_time.innerHTML = format_time((small / all) * video_.duration);
      video_.currentTime = (small / all) * video_.duration;
    };
    document.onmousemove = function (e) {
      var e = e || window.event;
      // console.log(e.pageX);
      var newleft = e.pageX - left_1 - left_2;
      // newleft <= 0
      //   ? (newleft = 0)
      //   : newleft >= 280
      //   ? (newleft = 280)
      //   : (newleft = newleft);
      video_.currentTime = (newleft / all_) * video_.duration; //????
    };
    jp_seek_bar.onmouseup = function () {
      document.onmousemove = "";
    };
  });
  // span_.onmousedown = function (e) {
  //   var e = e || window.event;
  //   var small_ = e.offsetX;
  //   var all_ = jp_seek_bar.offsetWidth;
  //   var left_1 = jp_seek_bar.offsetLeft;
  //   var box = document.getElementsByClassName("box")[0];
  //   var left_2 = box.offsetLeft;
  //   video_.currentTime = (small_ / all_) * video_.duration;
  //   span_.style.left = 16 + "px";
  //   document.onmousemove = function (e) {
  //     var e = e || window.event;
  //     // console.log(e.pageX);
  //     var newleft = e.pageX - left_1 - left_2;
  //     // console.log(newleft);
  //     span_.style.left = newleft + "px";
  //     // var all = jp_seek_bar.offsetWidth;
  //     // jp_play_bar.style.width = (newleft / all) * 100 + "%";
  //     // jp_current_time.innerHTML = format_time(
  //     //   (newleft / all) * video_.duration
  //     // );
  //     // console.log((newleft / all_) * video_.duration);
  //     video_.currentTime = (newleft / all_) * video_.duration; //????
  //   };
  //   document.onmouseup = function () {
  //     document.onmousemove = "";
  //     console.log(video_.currentTime);
  //   };
  // };
});
// 点击音量
var handle_ = document.getElementsByClassName("handle")[0];
var jp_volume_bar = document.getElementsByClassName("jp-volume-bar")[0];
var jp_volume_bar_value = document.getElementsByClassName(
  "jp-volume-bar-value"
)[0];
jp_volume_bar.onclick = function (e) {
  var e = e || window.event;
  var small = e.offsetX;
  var big = this.offsetWidth;
  jp_volume_bar_value.style.width = (small / big) * 100 + "%";
  video_.volume = small / big;
};
// 拖拽音量
handle_.onmousedown = function (e) {
  var e = e || window.event;
  var small = e.pageX;
  var big = this.offsetLeft;
  var delta = small - big;
  console.log(delta);
  document.onmousemove = function (e) {
    var e = e || window.event;
    var newleft = e.pageX - delta;
    handle_.style.left = newleft + "px";
    var yinliangbig = jp_volume_bar.offsetWidth;
    jp_volume_bar_value.style.width = (newleft / yinliangbig) * 100 + "%";
    video_.volume = newleft / yinliangbig; //????
  };
  document.onmouseup = function () {
    document.onmousemove = "";
  };
};
//格式化时间
function format_time(time) {
  var m = Math.floor(time / 60);
  m = m > 9 ? m : "0" + m;
  var s = Math.floor(time % 60);
  s = s > 9 ? s : "0" + s;
  return m + ":" + s;
}
