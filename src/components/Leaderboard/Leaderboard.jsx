import "./Leaderboard.scss";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Leaderboard({ theme }) {
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
      <div
        className={`leaderboard__main-container leaderboard__main-container--${theme}`}
      >
        <h1 className="leaderboard__title">Leaderboard:</h1>
        <div
          className={`leaderboard__subcontainer leaderboard__subcontainer--${theme}`}
        >
          <div className="leaderboard__content">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`leaderboard__main-container leaderboard__main-container--${theme}`}
    >
      <h1 className="leaderboard__title">Leaderboard:</h1>
      <div
        className={`leaderboard__subcontainer leaderboard__subcontainer--${theme}`}
      >
        <ol className="leaderboard__content">
          {leaderboardData.map((leader, index) => (
            <li key={leader.id} className="leaderboard__data-container">
              {JSON.stringify(leader)}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
