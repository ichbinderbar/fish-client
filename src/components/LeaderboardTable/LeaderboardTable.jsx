import "./LeaderboardTable.scss";
import LoginPrompter from "../LoginPrompter/LoginPrompter";

const LeaderboardTable = ({ leaderboardData, isAuthorized }) => {
  return (
    <>
      <div className="leaderboard-table__content">
        {!isAuthorized && <LoginPrompter />}
        {isAuthorized && (
          <>
            <div className="leaderboard-table__row">
              <div className="leaderboard-table__cell leaderboard-table__cell--rank">
                #
              </div>
              <div className="leaderboard-table__cell leaderboard-table__cell--winner">
                Winner
              </div>
              <div className="leaderboard-table__cell leaderboard-table__cell--score">
                Result
              </div>
              <div className="leaderboard-table__cell leaderboard-table__cell--date">
                Date
              </div>
            </div>
            {leaderboardData.map((leader, index) => (
              <div key={index} className="leaderboard-table__row">
                <div className="leaderboard-table__cell leaderboard-table__cell--rank">
                  {`${index + 1}.`}
                </div>
                <div className="leaderboard-table__cell leaderboard-table__cell--winner">
                  {leader.winner_name}
                </div>
                <div className="leaderboard-table__cell leaderboard-table__cell--score">
                  {leader.score}
                </div>
                <div className="leaderboard-table__cell leaderboard-table__cell--date">
                  {/* {`${formatDate(leader.date)}`} */}
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default LeaderboardTable;
