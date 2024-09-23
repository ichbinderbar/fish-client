import axios from "axios";

const apiUrl = "https://openai-experimental-server-eff701d4fdb7.herokuapp.com/";

export default async function handleCommentary(commentaryContext) {
  const promptMessage = `You are Michael Scott from The Office playing as the opponent in this game. ${commentaryContext}`;

  try {
    const result = await axios.post(`${apiUrl}api/get-response`, {
      prompt: promptMessage,
    });

    const commentary = result.data.choices[0].message.content;
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
