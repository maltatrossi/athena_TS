import { getHandName, getScore } from "./scoringFunctions";

const diceElements = document.querySelectorAll<HTMLDivElement>(".dice");
const diceImages = document.querySelectorAll<HTMLImageElement>(".dice-image");

let rollsLeft = 3;

function rollDice() {
  if (rollsLeft === 0) {
    return;
  }

  const heldDice: boolean[] = Array.from(document.querySelectorAll<HTMLInputElement>(".held"))
    .map((input) => input.checked);

  // hide current dice images
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

    const handName = getHandName(diceNumbers);
    const handId = document.querySelector("#hand-id h1")!;
    handId.textContent = handName;

    const score = getScore(diceNumbers);
    const scoreId = document.querySelector("#score-id h2")!;
    scoreId.textContent = score.toString();

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
    if (rollsLeft === 0) {
      const rollButton = document.querySelector("#roll-button") as HTMLButtonElement;
      rollButton.disabled = true;

      const finalScoreId = document.querySelector("#score-container h2")!;
      finalScoreId.textContent = "Final score:";
    }
  }, 500);
}


// Attach event listeners
document.addEventListener("DOMContentLoaded", () => {
  const rollButton = document.querySelector("#roll-button")!;
  rollButton.addEventListener("click", rollDice);

  diceElements.forEach((diceElement) => {
    diceElement.addEventListener("click", () => {
      const input = diceElement.querySelector("input[type='checkbox']") as HTMLInputElement;
      input.checked = !input.checked;

      // Toggle class to show selection effect
      const isSelected = input.checked;
      diceElement.classList.toggle("selected", isSelected);
      const position = diceElement.dataset.position!;
      diceImages.forEach((diceImage) => {
        if (diceImage.dataset.position === position) {
          diceImage.classList.toggle("selected", isSelected);
        }
      });
    });
  });
});
