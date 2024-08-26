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
