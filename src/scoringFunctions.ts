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
    } else if (isThreeOfAKind(sortedCounts)) {
      return "Three of a Kind";
    } else if (isTwoPair(sortedCounts)) {
      return "Two Pair";
    } else if (isPair(sortedCounts)) {
      return "Pair";
    } else {
      return "High card";
    }
  }
  
  export function getScore(diceNumbers: number[]): number {
    return diceNumbers.reduce((total, number) => total + number, 0);
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
      !isFullHouse(diceNumbers) &&
      !isFourOfAKind(diceNumbers) &&
      !isSmallStraight(diceNumbers) &&
      !isLargeStraight(diceNumbers) &&
      uniqueNumbers.size === 5
    );
  }
  