import React, { useState } from "react";
import "./SignInRegisterForm.scss";
import axios from "axios";
import { apiUrl } from "../../assets/data/Api";

export const SignInRegisterForm = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const toggleForm = () => setIsRegistered(!isRegistered);

  const registerNewUser = async () => {
    if (password !== confirmPassword) {
      console.error("Passwords do not match");
      return;
    }

    const newUser = {
      userName,
      email,
      password,
    };

    try {
      const response = await axios.post(`${apiUrl}/register`, newUser);
      console.log(response);
    } catch (error) {
      console.error("Error registering new user:", error);
    }
  };

  const loginUser = async () => {
    const userCredentials = {
      email,
      password,
    };

    try {
      const response = await axios.post(`${apiUrl}/login`, userCredentials);
      console.log(response);
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const handleSubmit = () => {
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
        onSubmit={(e) => e.preventDefault()}
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
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
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
            />
          </div>
        )}
        <button
          onClick={handleSubmit}
          type="button"
          className="sign-in-register-form__button"
        >
          {isRegistered ? "Register" : "Login"}
        </button>
      </form>
      <p className="sign-in-register-form__toggle-link">
        {isRegistered ? (
          <>
            Already have an account?{" "}
            <a
              href="#login"
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
              href="#register"
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
