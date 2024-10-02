import "./Profile.scss";
import userDpPlaceholder from "../../assets/images/user-dp.svg";
import LogoutButton from "../LogOutButton/LogOutButton";
import { useState } from "react";
import axios from "axios";
import { apiUrl } from "../../assets/data/Api";

export default function Profile({ user, setIsAuthorized, setUser }) {
  const [feedback, setFeedback] = useState("");
  const [userRole, setUserRole] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(
    user?.photo || userDpPlaceholder
  );

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      username: user.username,
      email: user.email,
      feedback,
      userRole,
    };

    try {
      const response = await axios.post(`${apiUrl}/user/feedback`, formData);

      console.log(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="user-card__container">
        <div className="user-card__photo-container">
          <img
            src={
              selectedImage
                ? URL.createObjectURL(selectedImage)
                : user?.photo || userDpPlaceholder
            }
            alt="User"
            className="user-card__photo-image"
          />
          <div className="user-card__photo-upload">
            <label htmlFor="fileInput" className="user-card__upload-icon">
              <input
                type="file"
                accept="image/*"
                id="fileInput"
                className="user-card__file-input"
                onChange={handleImageChange}
              />
              ✏️
            </label>
          </div>
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
      <form className="user-card__container" onSubmit={handleSubmit}>
        <textarea
          className="user-card__feedback-box"
          placeholder="Please leave your feedback here"
          onChange={(e) => setFeedback(e.target.value)}
          required
        ></textarea>

        <div className="user-card__feedback-options">
          <div className="user-card__dropdown">
            <label>
              Please select an option
              <select
                placeholder="Select your role"
                onChange={(e) => setUserRole(e.target.value)}
                required
                defaultValue={""}
              >
                <option value="" disabled>
                  Select your role
                </option>
                <option value="recruiter">Recruiter</option>
                <option value="educator">Educator</option>
                <option value="student">Student</option>
                <option value="alumni">Alumni</option>
                <option value="other">Other</option>
              </select>
            </label>
          </div>
          <div className="user-card__contact-checkbox">
            <input type="checkbox" required />
            I'd like to be contacted by the creator
          </div>
          <button className="user-card__feedback-button">Submit</button>
        </div>
      </form>
    </>
  );
}
