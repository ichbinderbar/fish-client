export default function sell(player, opponent) {
  function calculateCoins(fishedCards) {
    if (fishedCards < 20) return 0;
    let additionalCards = fishedCards - 20;
    return 6 + Math.floor(additionalCards / 2);
  }

  // Calculate and add coins for player
  player.coins += calculateCoins(player.fishedCards);

  // Calculate and add coins for opponent
  opponent.coins += calculateCoins(opponent.fishedCards);

  console.log(`${activePlayer.id} has now ${activePlayer.coins} coins`);
  console.log(`${inactivePlayer.id} has now ${inactivePlayer.coins} coins`);
}
