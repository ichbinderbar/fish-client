export default function sold() {
  if (player.coins >= 20) {
    console.log("Player wins with " + player.coins + " coins!");
    return true; // Indicate that the game should end
  } else if (opponent.coins >= 20) {
    console.log("Opponent wins with " + opponent.coins + " coins!");
    return true; // Indicate that the game should end
  }
  console.log("No winner yet!");
  return false; // No winner yet
}
