// import formatDate from "../../utils/FormateDate";
import "./LeaderboardTable.scss";
import LoginPrompter from "../LoginPrompter/LoginPrompter";

const LeaderboardTable = ({ leaderboardData }) => {
  return (
    <div className="leaderboard-table__content">
      <LoginPrompter />
      {leaderboardData.map((leader, index) => (
        <div key={index} className="leaderboard-table__row">
          <div className="leaderboard-table__cell leaderboard-table__cell--rank">
            {`${index + 1}.`}
          </div>
          <div className="leaderboard-table__cell leaderboard-table__cell--winner">
            {leader.winner}
          </div>
          <div className="leaderboard-table__cell leaderboard-table__cell--score">
            {leader.coins}
          </div>
          <div className="leaderboard-table__cell leaderboard-table__cell--date">
            {/* {`${formatDate(leader.date)}`} */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default LeaderboardTable;
