import axios from "axios";
import { apiUrl } from "../assets/data/Api";

export default async function getUser(accessToken, setUser) {
  try {
    const response = await axios.get(`${apiUrl}/profile`, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
    setUser(response.data);
  } catch (error) {
    console.error("Error fetching user profile:", error);
  }
}
