export const player = {
  id: "Player",
  hand: [],
  coins: 0,
  fishedCards: 0,
  fish: fish,
};

export const opponent = {
  id: "Opponent",
  hand: [],
  coins: 0,
  fishedCards: 0,
  fish: fishBot,
};

function fish() {
  if (this.hand.length > 0) {
    const fishedCard = this.hand.pop();
    console.log(`${this.id} fished a card: ${JSON.stringify(fishedCard)}.`);
  } else {
    console.log(`${this.id} has no cards to fish.`);
  }
}

function fishBot() {
  if (this.hand.length > 0) {
    const fishedCard = this.hand.pop();
    console.log(`${this.id} fished a card: ${fishedCard}.`);
  } else {
    console.log(`${this.id} has no cards to fish.`);
  }
}
