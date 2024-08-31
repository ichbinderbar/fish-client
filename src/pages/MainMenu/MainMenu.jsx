import "./MainMenu.scss";
import { Link } from "react-router-dom";

export default function MainMenu({ theme, handleThemeChange }) {
  return (
    <div
      className={`main-menu__main-container main-menu__main-container--${theme}`}
    >
      <Link to={"/scores"}>
        <div className="main-menu__button main-menu__button--scores">
          Scores
        </div>
      </Link>
      <Link to={"/game"}>
        <div className="main-menu__button main-menu__button--new-game">
          Start New Game
        </div>
      </Link>
      <Link to={"/instructions"}>
        <div className="main-menu__button main-menu__button--instructions">
          How To Play
        </div>
      </Link>
      <Link to={"/user-profile"}>
        <div className="main-menu__button main-menu__button--profile">
          My Profile
        </div>
      </Link>
      <div className="table__theme-button" onClick={handleThemeChange}>
        {theme === "light" ? "🌑" : "☀️"}
      </div>
    </div>
  );
}
