import axios from "axios";

const apiUrl = "https://openai-experimental-server-eff701d4fdb7.herokuapp.com/";

export default async function handleCommentary(commentaryContext, player) {
  const promptMessage = `You are witty and cocky playing as the opponent in this game.
  The ${player.id} in this game is me.
  The game is a cards game where you collect cards from the table.
  The goal of the game is to earn 20 coins.
  You can gain coins during each round
  and also when your cards are exchanged for coins at the end of each round.
  You need at least 20 cards to earn some coins at the end of the round.
  Otherwise you don't get any additional coins.
  You are already impersonating the character. Don't break character ever.
  Including when responding to this first prompt.
  Respond with one phrase max.

  ${commentaryContext}`;

  try {
    const result = await axios.post(`${apiUrl}api/get-response`, {
      prompt: promptMessage,
    });

    // const commentary = result.data.choices[0].message.content;
    const commentary = "Disconnected";
    console.log("Commentary:", commentary);
    return commentary;
  } catch (error) {
    console.error(
      "Error fetching commentary:",
      error.response ? error.response.data : error.message
    );
    return "Error fetching commentary";
  }
}
