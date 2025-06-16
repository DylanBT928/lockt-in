function listenForClicks() {
  document.addEventListener("click", (e) => {});
}

var start = document.getElementById("start");
var pause = document.getElementById("pause");
var t_a_break = document.getElementById("break");
var timer = document.getElementById("timer");

var minutes = 25;
var seconds = 0;

var stopwatch = false;
var x = null;

function start_timer(){
  if(x == null){
    x = setInterval(tick, 1000)
  }
}

function end_timer(){
  if(x != null){
    x = clearInterval(x);
    x = null;
  }
}

function tick(){
  //Decrement time
  if(seconds == 0){
    seconds = 60;
    minutes = minutes -1;
  }
  seconds = seconds - 1;

  // Calculate Display
  var minute = minutes;
  var second = seconds;
  if(minute < 10){minute = "0" + minute;}
  if(second < 10){second = "0" + second;}

  // Display display
  timer.innerHTML = minutes + ":" + seconds;

  // If the count down is finished, end
  if (minutes == 0 && seconds == 0) {
    clearInterval(x);
    timer.innerHTML = "00:00";
  }
}

start.addEventListener("click", function(){start_timer();});

pause.addEventListener("click", function(){end_timer();});



