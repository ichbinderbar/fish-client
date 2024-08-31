import "./ProfileCard.scss";
import playerDp from "../../assets/images/player.jpg";

export default function ProfileCard({ theme }) {
  return (
    <div
      className={`profile-card__main-container profile-card__main-container--${theme}`}
    >
      <h1 className="profile-card__title">Profile Info:</h1>
      <div
        className={`profile-card__subcontainer profile-card__subcontainer--${theme}`}
      ></div>
    </div>
  );
}
