var session_type = document.getElementById("session_type");
var start = document.getElementById("start");
var take_break = document.getElementById("break");
var timer = document.getElementById("timer");

var minutes = 25;
var seconds = 0;

var session = "focus";
var session_count = 0;
var x = null;
var is_running = false;

function initialize_display() {
  var min = minutes;
  var sec = seconds;

  if (min < 10) {
    min = "0" + min;
  }
  if (sec < 10) {
    sec = "0" + sec;
  }

  timer.innerHTML = min + ":" + sec;
  session_type.innerHTML = session;

  if (session === "focus") {
    take_break.innerHTML = "[ break ]";
  } else {
    take_break.innerHTML = "[ focus ]";
  }
}

initialize_display();

function start_timer() {
  if (x == null) {
    x = setInterval(tick, 1000);
    is_running = true;
    start.innerHTML = "[ pause ]";
    start.className = "pause-btn";
  }
}

function end_timer() {
  if (x != null) {
    x = clearInterval(x);
    x = null;
    is_running = false;
    start.innerHTML = "[ start ]";
    start.className = "start-btn";
  }
}

function tick() {
  //Decrement time
  if (seconds == 0) {
    seconds = 60;
    minutes = minutes - 1;
  }
  seconds = seconds - 1;

  // Calculate Display
  var minute = minutes;
  var second = seconds;
  if (minute < 10) {
    minute = "0" + minute;
  }
  if (second < 10) {
    second = "0" + second;
  }

  // Display display
  timer.innerHTML = minute + ":" + second;

  // Ends countdown when finished and sets up the next session
  if (minutes == 0 && seconds == 0) {
    end_timer();
    timer.innerHTML = "00:00";
    if (session_count == 4) {
      minutes = 20;
    } else if (session == "focus") {
      minutes = 5;
      session = "break";
      session_type.innerHTML = session;
      session_count += 1;
    } else {
      minutes = 25;
      session = "focus";
      session_type.innerHTML = session;
    }
    initialize_display();
  }
}

start.addEventListener("click", function () {
  if (is_running) {
    end_timer();
  } else {
    start_timer();
  }
});

take_break.addEventListener("click", function () {
  if (is_running) {
    end_timer();
  }

  // Toggle between focus and break sessions
  if (session === "focus") {
    session = "break";
    minutes = 5;
    seconds = 0;
  } else {
    session = "focus";
    minutes = 25;
    seconds = 0;
  }

  initialize_display();
});
