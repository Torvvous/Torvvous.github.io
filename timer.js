export let time = 35 * 60; //minutes * 60 seconds
export let refreshIntervalId = setInterval(updateCountdown, 1000); //update every 1 second

export function updateCountdown() {
  const minutes = Math.floor(time / 60); // rounds a number DOWN to the nearest integer
  let seconds = time % 60;

  seconds = seconds < 10 ? "0" + seconds : seconds;
  const contdownEl = document.getElementById("f1");

  contdownEl.innerHTML = `${minutes}:${seconds}`;
  time--;

  if (time < 0) {
    //stop the setInterval whe time = 0 for avoid negative time

    clearInterval(refreshIntervalId);
    location.reload(true);
  }
}
