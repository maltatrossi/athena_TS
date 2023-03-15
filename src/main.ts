import { startTimer } from "./timer";
import { rollDice } from "./diceRoll";
import { attachEventListeners } from "./eventListeners";
import { lockBestDice } from "./lockBestDice";



// Attach event listeners
document.addEventListener("DOMContentLoaded", () => {
attachEventListeners(lockBestDice, rollDice, startTimer);
});

