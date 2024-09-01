import React, { useState } from "react";
import "./SignInRegisterForm.scss";

export const SignInRegisterForm = () => {
  const [isRegistered, setIsRegistered] = useState(false);

  const toggleForm = () => setIsRegistered(!isRegistered);

  return (
    <div className="sign-in-register-form">
      <form className="sign-in-register-form__auth-form">
        <div className="sign-in-register-form__form-group">
          <label htmlFor="username" className="sign-in-register-form__label">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="sign-in-register-form__input"
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
            className="sign-in-register-form__input"
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
              className="sign-in-register-form__input"
              required
            />
          </div>
        )}
        <button type="submit" className="sign-in-register-form__button">
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
