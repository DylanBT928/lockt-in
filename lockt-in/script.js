var session_type = document.getElementById("session_type");
var start = document.getElementById("start");
var take_break = document.getElementById("break");
var timer = document.getElementById("timer");

let timerState = {
  minutes: 25,
  seconds: 0,
  session: "focus",
  session_count: 0,
  is_running: false,
  end_time: null,
};

let intervalId = null;

browser.storage.local.get(["timerState"]).then((result) => {
  if (result.timerState) {
    timerState = result.timerState;

    if (timerState.is_running && timerState.end_time) {
      const now = Date.now();
      const remaining = Math.max(0, timerState.end_time - now);

      if (remaining > 0) {
        timerState.minutes = Math.floor(remaining / 60000);
        timerState.seconds = Math.floor((remaining % 60000) / 1000);
        startTimer();
      } else {
        timerState.is_running = false;
        handleTimerEnd();
      }
    }
  }
  initialize_display();
});

function initialize_display() {
  var min = timerState.minutes;
  var sec = timerState.seconds;

  if (min < 10) {
    min = "0" + min;
  }
  if (sec < 10) {
    sec = "0" + sec;
  }

  timer.innerHTML = min + ":" + sec;
  session_type.innerHTML = timerState.session;

  if (timerState.session === "focus") {
    take_break.innerHTML = "[ break ]";
  } else {
    take_break.innerHTML = "[ focus ]";
  }

  if (timerState.is_running) {
    start.innerHTML = "[ pause ]";
    start.className = "pause-btn";
  } else {
    start.innerHTML = "[ start ]";
    start.className = "start-btn";
  }
}

function startTimer() {
  if (intervalId) return;

  timerState.is_running = true;
  timerState.end_time =
    Date.now() + (timerState.minutes * 60 + timerState.seconds) * 1000;

  intervalId = setInterval(() => {
    tick();
  }, 1000);

  start.innerHTML = "[ pause ]";
  start.className = "pause-btn";

  saveState();
}

function stopTimer() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
  timerState.is_running = false;
  timerState.end_time = null;

  start.innerHTML = "[ start ]";
  start.className = "start-btn";

  saveState();
}

function tick() {
  if (timerState.seconds === 0) {
    if (timerState.minutes === 0) {
      handleTimerEnd();
      return;
    }
    timerState.seconds = 59;
    timerState.minutes--;
  } else {
    timerState.seconds--;
  }

  // Calculate Display
  var minute = timerState.minutes;
  var second = timerState.seconds;
  if (minute < 10) {
    minute = "0" + minute;
  }
  if (second < 10) {
    second = "0" + second;
  }

  // Display display
  timer.innerHTML = minute + ":" + second;

  saveState();
}

function handleTimerEnd() {
  stopTimer();

  if (timerState.session_count === 4) {
    timerState.minutes = 20;
  } else if (timerState.session === "focus") {
    timerState.minutes = 5;
    timerState.session = "break";
    timerState.session_count++;
  } else {
    timerState.minutes = 25;
    timerState.session = "focus";
  }

  timerState.seconds = 0;
  initialize_display();
  saveState();
}

function saveState() {
  browser.storage.local.set({ timerState });
}

start.addEventListener("click", function () {
  if (timerState.is_running) {
    stopTimer();
  } else {
    startTimer();
  }
});

take_break.addEventListener("click", function () {
  if (timerState.is_running) {
    stopTimer();
  }

  // Toggle between focus and break sessions
  if (timerState.session === "focus") {
    timerState.session = "break";
    timerState.minutes = 5;
    timerState.seconds = 0;
  } else {
    timerState.session = "focus";
    timerState.minutes = 25;
    timerState.seconds = 0;
  }

  initialize_display();
  saveState();
});
