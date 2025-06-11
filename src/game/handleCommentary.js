import axios from "axios";
import { apiUrlOpenAi as apiUrl } from "../assets/data/Api";

export default async function handleCommentary(
  commentaryContext,
  player,
  opponent
) {
  const promptMessage = `
  ${new Date().toLocaleString()}
  You are impersonating ${opponent.name} in this game.
  Copy their talking style. Say things that person would say
  like famous quotes or words they often use.
  I am ${player.name}. We are not frienly to eachother.
  Do not refer to me by name.
  The game is a cards game where you collect cards from the table.
  The goal of the game is to earn 20 coins.
  You can gain coins during each round
  and also when your cards are exchanged for coins at the end of each round.
  You need at least 20 cards to earn some coins at the end of the round.
  Otherwise you don't get any additional coins.
  You are already impersonating the character. Don't break character ever.
  Including when responding to this first prompt.
  Respond with two phrases max.
  Pay attention to the timestamps to give yourself context of the evolution of the game.
  Pay attention to what you have said before so you don't repeat yourself.
  ${commentaryContext}`;

  console.log(promptMessage);

  try {
    const result = await axios.post(`${apiUrl}/api/get-response`, {
      prompt: promptMessage,
    });

    const commentary = result.data.choices[0].message.content;

    return commentary;
  } catch (error) {
    console.error(
      "AI commentary is not available right now",
      error.response ? error.response.data : error.message
    );
    return "AI commentary is not available right now";
  }
}
