import "./Profile.scss";

export default function Profile({ user }) {
  return (
    <div className="user-card__container">
      <div className="user-card__photo">
        <img
          src={user?.photo || "https://placehold.co/100"}
          alt="User"
          className="user-card__photo-image"
        />
      </div>
      <div className="user-card__details">
        <h2 className="user-card__details-username">
          {user?.username || "username"}
        </h2>
        <p className="user-card__details-email">
          Email: {user?.email || "email"}
        </p>
        <p className="user-card__details-phone">
          Phone: {user?.phone || "phone"}
        </p>
      </div>
    </div>
  );
}
