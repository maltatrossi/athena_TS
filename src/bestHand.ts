export function getHandName(diceNumbers: number[]): string {
    const counts = [0, 0, 0, 0, 0, 0];
    for (const number of diceNumbers) {
      counts[number - 1]++;
    }
  
    if (counts.includes(5)) {
      return "Five of a kind";
    } else if (counts.includes(4)) {
      return "Four of a kind";
    } else if (counts.includes(3) && counts.includes(2)) {
      return "Full house";
    } else if (diceNumbers.every((number) => number === diceNumbers[0] + 1)) {
      return "Straight";
    } else if (counts.filter((count) => count === 2).length === 2) {
      return "Two pair";
    } else if (counts.includes(3)) {
      return "Three of a kind";
    } else if (counts.includes(2)) {
      return "One pair";
    } else {
      return "High card";
    }
  }
  
  
  export function getScore(diceNumbers: number[]): number {
    const handName = getHandName(diceNumbers);
    switch (handName) {
      case "Five of a kind":
        return 50;
      case "Four of a kind":
        return diceNumbers.reduce((a, b) => a + b);
      case "Full house":
        return 25;
      case "Straight":
        return 40;
      case "Three of a kind":
        return diceNumbers.reduce((a, b) => a + b);
      case "Two pair":
        return 30;
      case "One pair":
        return 10;
      default:
        return 0;
    }
  }
  