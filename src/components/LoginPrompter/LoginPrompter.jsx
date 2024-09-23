import { Link } from "react-router-dom";
import "./LoginPrompter.scss";

export default function LoginPrompter() {
  return (
    <div className="login-prompter__main-container">
      Log in to save and see your playing history
      <Link to="/user" className="login-prompter__link">
        <button className="login-prompter__button">Go to log in page</button>
      </Link>
    </div>
  );
}
