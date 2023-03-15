export function attachEventListeners(
    lockBestDice: (diceNumbers: number[]) => void,
    rollDice: () => void,
    startTimer: (rollDice: () => void) => void
  ) {
    const rollButton = document.querySelector("#roll-button")!;
    rollButton.addEventListener("click", () => {
      rollDice();
      startTimer(rollDice);
    });
  
    const diceElements = document.querySelectorAll<HTMLDivElement>(".dice");
    const diceImages = document.querySelectorAll<HTMLImageElement>(".dice-image");
  
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
  }
  