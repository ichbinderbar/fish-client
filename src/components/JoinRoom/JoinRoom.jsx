import "./JoinRoom.scss";

export default function JoinRoom({
  handleRoomInput,
  handleJoinRandomRoom,
  isWaitingForPlayer,
  joiningRoomId,
}) {
  return (
    <>
      <div className={"join-room__finder"}>
        {isWaitingForPlayer ? (
          <div className="waiting-message">
            {joiningRoomId
              ? `Waiting for opponent to join room ${joiningRoomId}...`
              : "Waiting for another player to join..."}
          </div>
        ) : (
          <>
            <p>Find a Room</p>
            <input
              className="join-room__input"
              placeholder="Enter Room ID"
              onKeyDown={handleRoomInput}
            />
            <p className="join-room__or">or</p>
            <button
              className="join-room__button"
              onClick={handleJoinRandomRoom}
            >
              Join Random Room
            </button>
          </>
        )}
      </div>
    </>
  );
}
