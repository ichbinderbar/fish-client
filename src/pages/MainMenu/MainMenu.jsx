import "./MainMenu.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import Modal from "../../components/Modal/Modal";
import StartNewGameModal from "../../components/StartNewGameModal/StartNewGameModal";

export default function MainMenu({
  theme,
  handleThemeChange,
  setOpponentName,
  setOpponentLevel,
}) {
  const [isPersonalityModalVisible, setIsPersonalityModalVisible] =
    useState(false);
  const [isLevelModalVisible, setIsLevelModalVisible] = useState(false);
  const [isStarNewGameModalVisible, setIsStartNewGameModalVisible] =
    useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleStartGame = () => {
    setIsStartNewGameModalVisible(true);
  };

  const handleStartNewGameVsComputer = () => {
    setIsStartNewGameModalVisible(false);
    setIsPersonalityModalVisible(true);
  };

  const handleConfirmPersonality = () => {
    if (isPersonalityModalVisible) {
      setOpponentName(inputValue);
      setIsPersonalityModalVisible(false);
      setIsLevelModalVisible(true);
    }
  };

  const handleCancelNavigation = () => {
    setIsStartNewGameModalVisible(false);
    setIsPersonalityModalVisible(false);
    setIsLevelModalVisible(false);
  };

  const handleBackToGameMode = () => {
    setIsPersonalityModalVisible(false);
    setIsStartNewGameModalVisible(true);
  };

  return (
    <div
      className={`main-menu__main-container main-menu__main-container--${theme}`}
    >
      <StartNewGameModal
        isVisible={isStarNewGameModalVisible}
        onCancel={handleCancelNavigation}
        handleStartNewGameVsComputer={handleStartNewGameVsComputer}
        message={<>Choose Game Mode</>}
      />
      <Modal
        isVisible={isPersonalityModalVisible}
        onConfirm={handleConfirmPersonality}
        onCancel={handleBackToGameMode}
        message={<>Choose a personality for your opponent and click continue</>}
        placeholder={"e.g. Paul Atreides"}
        modifier={"start-game"}
        setInputValue={setInputValue}
      />
      <Modal
        isVisible={isLevelModalVisible}
        onCancel={handleCancelNavigation}
        message={<>Choose a level of difficulty.</>}
        modifier={"level"}
        setOpponentLevel={setOpponentLevel}
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
      <Link to={"/scores"}>
        <div className="main-menu__button main-menu__button--scores">
          Scores
        </div>
      </Link>
      <div className="table__theme-button" onClick={handleThemeChange}>
        {theme === "light" ? "🌙" : "☀️"}
      </div>
    </div>
  );
}
