import "./MainMenu.scss";
import { Link } from "react-router-dom";

export default function MainMenu() {
  return (
    <>
      <div className="main-menu__top-container">
        <div className="main-menu__button main-menu__button--scores">
          Scores
        </div>
        <Link to={"/game"}>
          <div className="main-menu__button main-menu__button--new-game">
            Start New Game
          </div>
        </Link>
        <div className="main-menu__button main-menu__button--instructions">
          How To Play
        </div>
        <div className="main-menu__button main-menu__button--profile">
          My Profile
        </div>
      </div>
      <div className="main-menu__bottom-container"></div>
    </>
  );
}
