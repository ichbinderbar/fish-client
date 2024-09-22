import "./ProfileCard.scss";
import { SignInRegisterForm } from "../SignInRegisterForm/SignInRegisterForm";
import { useState, useEffect } from "react";
import Profile from "../Profile/Profile";
import axios from "axios";
import { apiUrl } from "../../assets/data/Api";

export default function ProfileCard({ theme }) {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("jwt");
    if (accessToken) {
      setIsAuthorized(true);
      getUser(accessToken);
    }
  }, []);

  const getUser = async (accessToken) => {
    try {
      const response = await axios.get(`${apiUrl}/profile`, {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      });
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const handleLoginSuccess = () => {
    const accessToken = localStorage.getItem("jwt");
    if (accessToken) {
      setIsAuthorized(true);
      getUser(accessToken);
    }
  };

  return (
    <div
      className={`profile-card__main-container profile-card__main-container--${theme}`}
    >
      <h1 className="profile-card__title">Profile Info:</h1>
      <div
        className={`profile-card__subcontainer profile-card__subcontainer--${theme}`}
      >
        {!isAuthorized ? (
          <SignInRegisterForm onSuccess={handleLoginSuccess} />
        ) : (
          <Profile user={user} />
        )}
      </div>
    </div>
  );
}
