import "./ProfileCard.scss";
import { SignInRegisterForm } from "../SignInRegisterForm/SignInRegisterForm";
import Profile from "../Profile/Profile";

export default function ProfileCard({ theme, onSuccess, isAuthorized, user }) {
  return (
    <div
      className={`profile-card__main-container profile-card__main-container--${theme}`}
    >
      <h1 className="profile-card__title">Profile Info:</h1>
      <div
        className={`profile-card__subcontainer profile-card__subcontainer--${theme}`}
      >
        {!isAuthorized ? (
          <SignInRegisterForm onSuccess={onSuccess} />
        ) : (
          <Profile user={user} />
        )}
      </div>
    </div>
  );
}
