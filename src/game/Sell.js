export default function sell(playerFishedCards) {
  if (playerFishedCards < 20) return 0;
  return 6 + Math.floor(playerFishedCards - 20);
}
