import "./IsActiveAlert.scss";

export default function IsActiveAlert({ player, opponent }) {
  return (
    <>
      <div className="is-active-alert">{player.isActive ? "🟢" : "🔴"}</div>
    </>
  );
}
