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
    const fishedCard = this.hand.pop();
    console.log(`${this.id} fished a card: ${JSON.stringify(fishedCard)}`);
    return fishedCard;
  } else {
    console.log(`${this.id} has no cards to fish with`);
    return null;
  }
}

function fishBot() {
  if (this.hand.length > 0) {
    const fishedCard = this.hand.pop();
    console.log(`${this.id} fished a card: ${JSON.stringify(fishedCard)}`);
    return fishedCard;
  } else {
    console.log(`${this.id} has no cards to fish with`);
    return null;
  }
}
