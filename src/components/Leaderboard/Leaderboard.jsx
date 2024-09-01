import "./Leaderboard.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import LeaderboardTable from "../LeaderboardTable/LeaderboardTable";

export default function Leaderboard({ theme }) {
  const [leaderboardData, setLeaderboardData] = useState(null);

  const getLeaderboardData = async () => {
    try {
      const leaderboardData = await axios.get(
        "https://fish-server-deb16c6159c1.herokuapp.com/leaderboard"
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
          <div className="leaderboard__data-container">Loading...</div>
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
        <LeaderboardTable leaderboardData={leaderboardData} />
        {/* <ol className="leaderboard__content">
          {leaderboardData.map((leader, index) => (
            <li key={leader.id} className="leaderboard__data-container">
              {JSON.stringify(leader)}
            </li>
          ))}
        </ol> */}
      </div>
    </div>
  );
}
