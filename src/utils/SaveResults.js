import axios from "axios";
import { apiUrl } from "../assets/data/Api";

export const saveResults = async (gameResults) => {
  try {
    await axios.post(`${apiUrl}/gameresults`, gameResults);
  } catch (error) {
    console.log(error);
  }
  console.log(gameResults);
  return true;
};
