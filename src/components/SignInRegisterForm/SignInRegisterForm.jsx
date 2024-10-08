import React, { useState } from "react";
import "./SignInRegisterForm.scss";
import axios from "axios";
import { apiUrl } from "../../assets/data/Api";
import errorIcon from "../../assets/icons/error.svg";

export const SignInRegisterForm = ({ onSuccess }) => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alert, setAlert] = useState("");

  const toggleForm = () => {
    setIsRegistered(!isRegistered);
    setAlert("");
  };

  const registerNewUser = async () => {
    if (username === "") {
      setAlert("Username is required");
      return;
    }
    if (email === "") {
      setAlert("Email is required");
      return;
    }
    if (password !== confirmPassword) {
      setAlert("Passwords do not match");
      return;
    }

    const newUser = {
      username,
      email,
      password,
    };

    try {
      const response = await axios.post(`${apiUrl}/user/register`, newUser);
      toggleForm();
    } catch (error) {
      setAlert(error.response.data.message);
    }
  };

  const loginUser = async () => {
    const userCredentials = {
      email,
      password,
    };

    try {
      const response = await axios.post(
        `${apiUrl}/user/login`,
        userCredentials
      );
      const accessToken = response.data.accessToken;
      localStorage.setItem("jwt", accessToken);

      if (onSuccess) onSuccess();
    } catch (error) {
      setAlert(error.response.data.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegistered) {
      registerNewUser();
    } else {
      loginUser();
    }
  };

  return (
    <div className="sign-in-register-form">
      <form
        className="sign-in-register-form__auth-form"
        onSubmit={handleSubmit}
      >
        {isRegistered && (
          <div className="sign-in-register-form__form-group">
            <label htmlFor="username" className="sign-in-register-form__label">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              className="sign-in-register-form__input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
        )}
        <div className="sign-in-register-form__form-group">
          <label htmlFor="email" className="sign-in-register-form__label">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            className="sign-in-register-form__input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="sign-in-register-form__form-group">
          <label htmlFor="password" className="sign-in-register-form__label">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            className="sign-in-register-form__input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {isRegistered && (
          <div className="sign-in-register-form__form-group">
            <label
              htmlFor="confirm-password"
              className="sign-in-register-form__label"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              name="confirm-password"
              placeholder="Confirm password"
              className="sign-in-register-form__input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
        )}
        <button type="submit" className="sign-in-register-form__button">
          {isRegistered ? "Register" : "Login"}
        </button>
        <p className="sign-in-register-form__alert">
          {alert !== "" && (
            <>
              <img
                className="sign-in-register-form__alert-icon"
                src={errorIcon}
                alt="Error icon"
              />
              {`${alert}`}
            </>
          )}
        </p>
      </form>
      <p className="sign-in-register-form__toggle-link">
        {isRegistered ? (
          <>
            Already have an account?{" "}
            <a
              href="#register"
              className="sign-in-register-form__link"
              onClick={toggleForm}
            >
              Login here
            </a>
          </>
        ) : (
          <>
            Don't have an account?{" "}
            <a
              href="#login"
              className="sign-in-register-form__link"
              onClick={toggleForm}
            >
              Register here
            </a>
          </>
        )}
      </p>
    </div>
  );
};
