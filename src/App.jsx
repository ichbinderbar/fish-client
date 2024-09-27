import "./App.scss";
import { useState, useEffect } from "react";
import MainMenu from "./pages/MainMenu/MainMenu";
import InstructionsBoard from "./components/InstructionsBoard/InstructionsBoard";
import Leaderboard from "./components/Leaderboard/Leaderboard";
import ProfileCard from "./components/ProfileCard/ProfileCard";
import GamePage from "./pages/GamePage/GamePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MultiplayerGamePage from "./pages/OnlineGamePage.jsx/MultiplayerGamePage";
import getUser from "./utils/getUser";
import { opponent } from "./game/PlayerObjects";

function App() {
  const [theme, setTheme] = useState("light");
  const [user, setUser] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [playerName, setPlayerName] = useState("Player");
  const [opponentName, setOpponentName] = useState("Opponent");

  const setOpponentLevel = (selectedBot) => {
    opponent.fishBot = selectedBot;
  };

  useEffect(() => {
    if (localStorage.getItem("theme") === "ligh") {
      setTheme("light");
    }
    if (localStorage.getItem("theme") === "dark") {
      setTheme("dark");
    }
  }, []);

  const handleThemeChange = () => {
    if (theme === "dark") {
      setTheme("light");
      localStorage.setItem("theme", "light");
      return;
    }
    setTheme("dark");
    localStorage.setItem("theme", "dark");
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("jwt");
    if (accessToken) {
      setIsAuthorized(true);
      getUser(accessToken, setUser);
    }
  }, []);

  useEffect(() => {
    if (user) {
      setPlayerName(user.username);
    }
  }, [user]);

  const handleLoginSuccess = () => {
    const accessToken = localStorage.getItem("jwt");
    if (accessToken) {
      setIsAuthorized(true);
      getUser(accessToken, setUser);
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="*"
          element={
            <>
              <MainMenu
                setTheme={setTheme}
                theme={theme}
                handleThemeChange={handleThemeChange}
                setOpponentName={setOpponentName}
                setOpponentLevel={setOpponentLevel}
              />
              <Leaderboard theme={theme} isAuthorized={isAuthorized} />
            </>
          }
        />
        <Route
          path="/"
          element={
            <>
              <MainMenu
                setTheme={setTheme}
                theme={theme}
                handleThemeChange={handleThemeChange}
                setOpponentName={setOpponentName}
                setOpponentLevel={setOpponentLevel}
              />
              <Leaderboard theme={theme} isAuthorized={isAuthorized} />
            </>
          }
        />
        <Route
          path="/instructions"
          element={
            <>
              <MainMenu
                setTheme={setTheme}
                theme={theme}
                handleThemeChange={handleThemeChange}
                setOpponentName={setOpponentName}
                setOpponentLevel={setOpponentLevel}
              />
              <InstructionsBoard theme={theme} />
            </>
          }
        />
        <Route
          path="/scores"
          element={
            <>
              <MainMenu
                setTheme={setTheme}
                theme={theme}
                handleThemeChange={handleThemeChange}
                setOpponentName={setOpponentName}
                setOpponentLevel={setOpponentLevel}
              />
              <Leaderboard theme={theme} isAuthorized={isAuthorized} />
            </>
          }
        />
        <Route
          path="/user"
          element={
            <>
              <MainMenu
                setTheme={setTheme}
                theme={theme}
                handleThemeChange={handleThemeChange}
                setOpponentName={setOpponentName}
                setOpponentLevel={setOpponentLevel}
              />
              <ProfileCard
                theme={theme}
                onSuccess={handleLoginSuccess}
                isAuthorized={isAuthorized}
                user={user}
                setIsAuthorized={setIsAuthorized}
                setUser={setUser}
              ></ProfileCard>
            </>
          }
        />
        <Route
          path="/game"
          element={
            <GamePage
              setTheme={setTheme}
              theme={theme}
              handleThemeChange={handleThemeChange}
              playerName={playerName}
              opponentName={opponentName}
            />
          }
        />
        <Route
          path="/multiplayergame"
          element={
            <MultiplayerGamePage
              setTheme={setTheme}
              theme={theme}
              handleThemeChange={handleThemeChange}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
