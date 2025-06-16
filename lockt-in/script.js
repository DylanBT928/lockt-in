function listenForClicks() {
  document.addEventListener("click", (e) => {});
}

var start = document.getElementById("start");
var pause = document.getElementById("pause");
var t_a_break = document.getElementById("break");
var timer = document.getElementById("timer");

var minutes = 25;
var seconds = 0;

var x;

function start_timer(){

  //Decrement time
  if(seconds == 0){
    seconds = 60;
    minutes = minutes -1;
  }
  seconds = seconds - 1;

  // Display the time
  timer.innerHTML = minutes + ":" + seconds;

  // If the count down is finished, end
  if (minutes == 0 && seconds == 0) {
    clearInterval(x);
    timer.innerHTML = "00:00";
  }
}

start.addEventListener("click", function(){
  // Update the count down every 1 second
  x = setInterval(start_timer(), 1000);
});




