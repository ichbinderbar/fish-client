import "./MainMenu.scss";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Modal from "../../components/Modal/Modal";

export default function MainMenu({
  theme,
  handleThemeChange,
  setOpponentName,
}) {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleStartGame = () => {
    setIsModalVisible(true);
  };

  const handleConfirmNavigation = () => {
    setIsModalVisible(false);
    setOpponentName(inputValue);
    navigate("/game");
  };

  const handleCancelNavigation = () => {
    setIsModalVisible(false);
  };

  return (
    <div
      className={`main-menu__main-container main-menu__main-container--${theme}`}
    >
      <Link to={"/scores"}>
        <div className="main-menu__button main-menu__button--scores">
          Scores
        </div>
      </Link>
      <Modal
        isVisible={isModalVisible}
        onConfirm={handleConfirmNavigation}
        onCancel={handleCancelNavigation}
        message={
          <>
            Choose a name and mood to add personality to your opponent.
            <br />
            Or click continue to play against the default personality.
            <br />
            Keep it classy.
          </>
        }
        modifier={"start-game"}
        setInputValue={setInputValue}
      />
      <Link onClick={handleStartGame}>
        <div className="main-menu__button main-menu__button--new-game">
          Start New Game
        </div>
      </Link>
      <Link to={"/instructions"}>
        <div className="main-menu__button main-menu__button--instructions">
          How To Play
        </div>
      </Link>
      <Link to={"/user"}>
        <div className="main-menu__button main-menu__button--profile">
          My Profile
        </div>
      </Link>
      <div className="table__theme-button" onClick={handleThemeChange}>
        {theme === "light" ? "🌙" : "☀️"}
      </div>
    </div>
  );
}
