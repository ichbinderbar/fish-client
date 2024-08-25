export default function sell(playerFishedCards) {
  if (playerFishedCards < 20) return 0;
  let additionalCards = playerFishedCards - 20;
  return 6 + Math.floor(additionalCards / 2);
}
