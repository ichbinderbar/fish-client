import "./Profile.scss";
import userDpPlaceholder from "../../assets/images/user-dp.svg";

export default function Profile({ user }) {
  if (!user) {
    return <></>;
  }

  return (
    <div className="user-card__container">
      <div className="user-card__photo">
        <img
          src={user?.photo || userDpPlaceholder}
          alt="User"
          className="user-card__photo-image"
        />
      </div>
      <div className="user-card__details">
        <h2 className="user-card__details-username">
          {user?.username || "username"}
        </h2>
        <p className="user-card__details-email">{user?.email || "email"}</p>
      </div>
    </div>
  );
}
