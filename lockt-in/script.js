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

function start_timer(){

  if(stopwatch){
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
  }}
}
  // Update the count down every 1 second
var x = setInterval(start_timer(), 1000);

start.addEventListener("click", function(){stopwatch = true;});

pause.addEventListener("click", function(){stopwatch = false;})



