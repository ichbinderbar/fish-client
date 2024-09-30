import "./IsActiveAlert.scss";

export default function IsActiveAlert({ player }) {
  return (
    <>
      <div className="is-active-alert">{player.isActive ? "🟢" : "🟠"}</div>
    </>
  );
}
