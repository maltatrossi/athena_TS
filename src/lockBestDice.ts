
const diceElements = document.querySelectorAll<HTMLDivElement>(".dice");
const diceImages = document.querySelectorAll<HTMLImageElement>(".dice-image");

export function lockBestDice(diceNumbers: number[]) {
  // Check for pairs
  const counts = countDice(diceNumbers);
  const maxCount = Math.max(...counts);
  if (maxCount >= 2) {
    counts.forEach((count, number) => {
      if (count >= 2) {
        diceNumbers.forEach((die, index) => {
          if (die === number + 1) {
            const input = diceElements[index].querySelector("input[type='checkbox']") as HTMLInputElement;
            input.checked = true;
            diceElements[index].classList.add("selected");
            diceImages[index].classList.add("selected");
          }
        });
      }
    });
  } else {
    // Lock all dice with the highest number
    const maxNumber = Math.max(...diceNumbers);
    diceNumbers.forEach((number, index) => {
      if (number === maxNumber) {
        const input = diceElements[index].querySelector("input[type='checkbox']") as HTMLInputElement;
        input.checked = true;
        diceElements[index].classList.add("selected");
        diceImages[index].classList.add("selected");
      }
    });
  }
}

function countDice(diceNumbers: number[]): number[] {
  const counts: number[] = [0, 0, 0, 0, 0, 0];

  diceNumbers.forEach((number) => {
    counts[number - 1]++;
  });

  return counts;
}
