import "./ProfileCard.scss";
import { SignInRegisterForm } from "../SignInRegisterForm/SignInRegisterForm";
import { useState, useEffect } from "react";
import Profile from "../Profile/Profile";

export default function ProfileCard({ theme }) {
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("jwt");
    if (accessToken) {
      setIsAuthorized(true);
    }
  }, []);

  return (
    <div
      className={`profile-card__main-container profile-card__main-container--${theme}`}
    >
      <h1 className="profile-card__title">Profile Info:</h1>
      <div
        className={`profile-card__subcontainer profile-card__subcontainer--${theme}`}
      >
        {!isAuthorized ? (
          <SignInRegisterForm onSuccess={() => setIsAuthorized(true)} />
        ) : (
          <Profile />
        )}
      </div>
    </div>
  );
}
