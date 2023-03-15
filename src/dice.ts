import { getHandName, getScore } from "./bestHand";
import { resetTimer, startTimer, hideTimer } from "./timer";
import { lockBestDice } from "./lockBestDice";

const diceImages = document.querySelectorAll<HTMLImageElement>(".dice-image");

let rollsLeft = 3;

export function rollDice() {
  if (rollsLeft === 0) {
    return;
  }

  const heldDice: boolean[] = Array.from(document.querySelectorAll<HTMLInputElement>(".held"), (input) => input.checked);

  // Hide current dice images
  diceImages.forEach((diceImage, index) => {
    if (!heldDice[index]) {
      diceImage.style.visibility = "hidden";
    }
  });

  setTimeout(() => {
    const diceNumbers: number[] = [];
    diceImages.forEach((diceImage, index) => {
      if (!heldDice[index]) {
        const diceNumber = Math.floor(Math.random() * 6) + 1;
        diceNumbers.push(diceNumber);
      } else {
        const diceNumber = parseInt(diceImage.src.match(/dice(\d)\.png/)[1], 10);
        diceNumbers.push(diceNumber);
      }
    });
  
    lockBestDice(diceNumbers);
  
    // Update hand name and score
    const handName = getHandName(diceNumbers);
    const handId = document.querySelector("#hand-id h1")!;
    handId.textContent = handName;
  
    const score = getScore(diceNumbers);
    const scoreId = document.querySelector("#score-id h2")!;
    scoreId.textContent = score.toString();
  
    // Show new dice images
    let delay = 0;
    diceImages.forEach((diceImage, index) => {
      if (!heldDice[index]) {
        setTimeout(() => {
          diceImage.style.visibility = "visible";
          const diceNumber = diceNumbers[index];
          diceImage.src = `assets/images/dice/dice${diceNumber}.png`;
        }, delay);
        delay += 150;
      } else {
        diceImage.style.visibility = "visible";
      }
    });
  
    rollsLeft--;
  
    // Reset and start the timer after each roll, except for the last one
    if (rollsLeft > 0) {
      resetTimer();
      startTimer(rollDice);
      hideTimer(false);
    }
      
    if (rollsLeft === 0) {
      // Disable roll button and show final score
      const rollButton = document.querySelector("#roll-button") as HTMLButtonElement;
      rollButton.disabled = true;
  
      // Call resetTimer() only if it's the last roll
      resetTimer();
      hideTimer(true);
  
      const finalScoreId = document.querySelector("#score-container h2")!;
      finalScoreId.textContent = "Final score:";
  
      // Show replay button
      const replayButton = document.createElement("button");
      replayButton.id = "replay";
      replayButton.textContent = "Play again";
      replayButton.addEventListener("click", () => {
        location.reload();
      });
      const scoreContainer = document.querySelector("#score-container")!;
      scoreContainer.appendChild(replayButton);
    }
  }, 500);
}
