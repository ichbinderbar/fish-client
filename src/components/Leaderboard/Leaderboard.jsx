import "./Leaderboard.scss";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState(null);

  const getLeaderboardData = async () => {
    try {
      const leaderboardData = await axios.get(
        "http://localhost:1809/leaderboard"
      );
      setLeaderboardData(leaderboardData.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLeaderboardData();
  }, []);

  if (leaderboardData === null) {
    return (
      <div className="leaderboard__main-container">
        <h1 className="leaderboard__title">Leaderboard:</h1>
        <div className="leaderboard__subcontainer">
          <div className="leaderboard__content">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="leaderboard__main-container">
      <h1 className="leaderboard__title">Leaderboard:</h1>
      <div className="leaderboard__subcontainer">
        <ol className="leaderboard__content">
          {leaderboardData.map((leader, index) => (
            <li key={index} className="leaderboard__data-container">
              {JSON.stringify(leader)}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
