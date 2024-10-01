import "./Profile.scss";
import userDpPlaceholder from "../../assets/images/user-dp.svg";
import LogoutButton from "../LogOutButton/LogOutButton";
import { useNavigate } from "react-router-dom";

export default function Profile({ user, setIsAuthorized, setUser }) {
  const navigate = useNavigate();

  if (!user) {
    navigate("/user#register");
  }

  return (
    <>
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
          <LogoutButton
            className="user-card__logout"
            setIsAuthorized={setIsAuthorized}
            setUser={setUser}
          />
        </div>
      </div>
      <div className="user-card__container">
        <textarea
          className="user-card__feedback-box"
          placeholder="Please leave your feedback here"
        ></textarea>
        <button className="user-card__feedback-button">Submit</button>
      </div>
    </>
  );
}
