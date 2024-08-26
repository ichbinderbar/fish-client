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
  fish: fishBot,
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

// To-Do: Smart fishBot V1 preffers collecting cards than earning coins from last card match
// to determine best play the fishBot:
////// - compares its hand array to the table card array number values and finds the longest combination in table that is also in schools
////// - and returns first card that matches longest combination in schools

// this fishBot simply pops a card from hand and hopes for the best
function fishBot() {
  if (this.hand.length > 0) {
    const fishingCard = this.hand.pop();
    // console.log(`${this.id} played:`, fishingCard);
    return fishingCard;
  } else {
    console.log(`${this.id} has no cards to play with`);
    return null;
  }
}
