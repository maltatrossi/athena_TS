export function getHandName(diceNumbers: number[]): string {
  const counts = countDice(diceNumbers);
  const sortedCounts = counts.sort((a, b) => b - a);

  if (isYahtzee(sortedCounts)) {
    return "Yahtzee";
  } else if (isFullHouse(sortedCounts)) {
    return "Full House";
  } else if (isLargeStraight(diceNumbers)) {
    return "Large Straight";
  } else if (isSmallStraight(diceNumbers)) {
    return "Small Straight";
  } else if (isFourOfAKind(sortedCounts)) {
    return "Four of a Kind";
  } else if (isThreeOfAKind(sortedCounts)) {
    return "Three of a Kind";
  } else if (isTwoPair(sortedCounts)) {
    return "Two Pair";
  } else if (isPair(sortedCounts)) {
    return "Pair";
  } else {
    return "High Card";
  }
}

export function getScore(diceNumbers: number[]): number {
  const handName = getHandName(diceNumbers);
  const handValue = getHandValue(handName);
  const diceSum = diceNumbers.reduce((total, number) => total + number, 0);

  let score = handValue;

  if (handName === "Yahtzee") {
    if (diceNumbers.every((diceNumber) => diceNumber === diceNumbers[0])) {
      score += 100;
    }
  }

  if (handName === "Full House") {
    score += 25;
  }

  if (handName === "Large Straight") {
    score += 40;
  }

  if (handName === "Small Straight") {
    score += 30;
  }

  if (handName === "Four of a Kind") {
    for (let i = 1; i <= 6; i++) {
      if (countDice(diceNumbers)[i] >= 4) {
        score += i * 4;
        break;
      }
    }
  }

  if (handName === "Three of a Kind") {
    for (let i = 1; i <= 6; i++) {
      if (countDice(diceNumbers)[i] >= 3) {
        score += i * 3;
        break;
      }
    }
  }

  if (handName === "Two Pair") {
    let pairs = 0;
    let pairValues = [];
    for (let i = 1; i <= 6; i++) {
      if (countDice(diceNumbers)[i] >= 2) {
        pairs++;
        pairValues.push(i);
        if (pairs === 2) {
          score += pairValues.reduce((total, value) => total + value, 0) * 2;
          break;
        }
      }
    }
  }

  if (handName === "Pair") {
    for (let i = 1; i <= 6; i++) {
      if (countDice(diceNumbers)[i] >= 2) {
        score += i * 2;
        break;
      }
    }
  }

  score += diceSum;

  return score;
}


function countDice(diceNumbers: number[]): number[] {
  const counts: number[] = [0, 0, 0, 0, 0, 0];

  diceNumbers.forEach((number) => {
    counts[number - 1]++;
  });

  return counts;
}

function isYahtzee(sortedCounts: number[]): boolean {
  return sortedCounts[0] === 5;
}

function isFullHouse(sortedCounts: number[]): boolean {
  return sortedCounts[0] === 3 && sortedCounts[1] === 2;
}

function isLargeStraight(diceNumbers: number[]): boolean {
  const uniqueNumbers = new Set(diceNumbers);
  return (
    uniqueNumbers.has(2) &&
    uniqueNumbers.has(3) &&
    uniqueNumbers.has(4) &&
    uniqueNumbers.has(5) &&
    uniqueNumbers.has(6)
  );
}

function isSmallStraight(diceNumbers: number[]): boolean {
  const uniqueNumbers = new Set(diceNumbers);
  return (
    uniqueNumbers.has(1) &&
    uniqueNumbers.has(2) &&
    uniqueNumbers.has(3) &&
    uniqueNumbers.has(4) &&
    uniqueNumbers.has(5)
  );
}
function isFourOfAKind(sortedCounts: number[]): boolean {
  return sortedCounts[0] === 4;
}

function isThreeOfAKind(sortedCounts: number[]): boolean {
  return sortedCounts[0] === 3;
}

function isTwoPair(sortedCounts: number[]): boolean {
  return sortedCounts[0] === 2 && sortedCounts[1] === 2 && sortedCounts[2] !== 2;
}

function isPair(sortedCounts: number[]): boolean {
  return sortedCounts[0] === 2 && sortedCounts[1] !== 2;
}

function isHighCard(diceNumbers: number[]): boolean {
  const uniqueNumbers = new Set(diceNumbers);
  return (
    !isPair(diceNumbers) &&
    !isTwoPair(diceNumbers) &&
    !isThreeOfAKind(diceNumbers) &&
    !isFourOfAKind(diceNumbers) &&
    !isFullHouse(diceNumbers) &&
    !isSmallStraight(diceNumbers) &&
    !isLargeStraight(diceNumbers) &&
    uniqueNumbers.size === 5
  );
}

function getHandValue(handName: string): number {
  const handValues: Record<string, number> = {
    "Yahtzee": 50,
    "Large Straight": 40,
    "Small Straight": 30,
    "Full House": 25,
    "Four of a Kind": 20,
    "Three of a Kind": 15,
    "Two Pair": 10,
    "Pair": 5,
    "High Card": 0,
  };

  return handValues[handName] || 0;
}
