export const player = {
  id: "Player",
  isActive: false,
  hand: [],
  coins: 0,
  fishedCards: 0,
  fish: fish,
};

export const opponent = {
  id: "Opponent",
  isActive: false,
  hand: [],
  coins: 0,
  fishedCards: 0,
  fishBot: fishBot,
};

function fish() {
  if (this.hand.length > 0) {
    const fishingCard = this.hand.pop();
    console.log(`${this.id} played: ${JSON.stringify(fishingCard)}`);
    return fishingCard;
  } else {
    console.log(`${this.id} has no cards to play with`);
    return null;
  }
}

function fishBot(setOpponent, table, setTable, setLastPlacedCard) {
  if (this.hand.length > 0) {
    const fishedCard = this.hand.pop();

    if (fishedCard) {
      const updatedTable = [...table, fishedCard];
      console.log(`${this.id} played:`, fishedCard);
      setTable(updatedTable);

      setLastPlacedCard(fishedCard);

      setOpponent((prevOpponent) => ({
        ...prevOpponent,
        hand: [...prevOpponent.hand],
      }));
    }
  } else {
    console.log(`FishBot invoked but ${this.id} has no cards to play`);
  }
}

// To-Do: Smart fishBot V1 preffers collecting cards than earning coins from last card match
// to determine best play the fishBot:
////// - compares its hand array to the table card array number values and finds the longest combination in table that is also in schools
////// - and returns first card that matches longest combination in schools

// To-Do: Smart fishBot V2 preffers earning points from last card matches than fishing longer schools
// to determine best play the fishBot:
////// - compares its hand array to the table card array number values and finds the longest combination in table that is also in schools that also matches the number value
////// - and returns first card that matches this criteria
