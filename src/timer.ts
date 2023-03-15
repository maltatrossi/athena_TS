const timerElement = document.getElementById("timer");

let timer: NodeJS.Timeout;
let timeLeft: number;

export function startTimer(rollDice: () => void) {
  if (timer) {
    clearInterval(timer);
  }

  timeLeft = 500;
  updateTimerText(timeLeft);

  timer = setInterval(() => {
    timeLeft--;
    updateTimerText(timeLeft);

    if (timeLeft <= 0) {
      clearInterval(timer);
      rollDice();
    }
  }, 10);
}

function updateTimerText(timeLeft: number) {
  const seconds = Math.floor(timeLeft / 100);
  const decimals = timeLeft % 100;
  timerElement.textContent = `00:${seconds.toString().padStart(2, "0")}:${decimals.toString().padStart(2, "0")}`;
}

export function resetTimer() {
  clearInterval(timer);
}

export function hideTimer(hide: boolean) {
  timerElement.style.display = hide ? "none" : "initial";
}
