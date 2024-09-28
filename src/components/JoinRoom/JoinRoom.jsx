import "./JoinRoom.scss";

export default function JoinRoom({ handleRoomInput, handleJoinRandomRoom }) {
  return (
    <>
      <h2>Find a Room</h2>
      <input
        className="multiplayer-game-page__input"
        placeholder="Enter Room ID"
        onKeyDown={handleRoomInput}
      />
      <button
        className="multiplayer-game-page__button"
        onClick={handleJoinRandomRoom}
      >
        Join Random Room
      </button>
    </>
  );
}
