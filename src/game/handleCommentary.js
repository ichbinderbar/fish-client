export default function handleCommentary(commentaryContext) {
  const promptMessage = `You are Michael Scott from The Office playing as the opponent in this game. ${commentaryContext}`;

  console.log(promptMessage);
}
