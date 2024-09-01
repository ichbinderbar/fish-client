import axios from "axios";

export const saveResults = async (gameResults) => {
  try {
    const leaderboardData = await axios.post(
      "https://fish-server-deb16c6159c1.herokuapp.com/gameresults",
      gameResults
    );
  } catch (error) {
    console.log(error);
  }
  console.log(gameResults);
  return true;
};
