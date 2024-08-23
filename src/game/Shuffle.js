// The Shuffle function uses the Fisher-Yates shuffle algorithm
// The use of slice() ensures that the original array is not modified,
// and the shuffling is done on a copy of the array.
// The function then returns the shuffled copy.
export default function shuffle(deck) {
  const deckCopy = deck.slice(); // Shallow copy
  for (let i = deckCopy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deckCopy[i], deckCopy[j]] = [deckCopy[j], deckCopy[i]];
  }
  return deckCopy; // Shuffled copy
}
