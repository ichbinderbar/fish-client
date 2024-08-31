import "./App.scss";
import { useState, useEffect } from "react";
import MainMenu from "./pages/MainMenu/MainMenu";
import InstructionsBoard from "./components/InstructionsBoard/InstructionsBoard";
import Leaderboard from "./components/Leaderboard/Leaderboard";
import ProfileCard from "./components/ProfileCard/ProfileCard";
import GamePage from "./pages/GamePage/GamePage";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";

function App() {
  const [theme, setTheme] = useState("light");

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

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <MainMenu
                setTheme={setTheme}
                theme={theme}
                handleThemeChange={handleThemeChange}
              />
              <Leaderboard theme={theme} />
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
              />
              <Leaderboard theme={theme} />
            </>
          }
        />
        <Route
          path="/user-profile"
          element={
            <>
              <MainMenu
                setTheme={setTheme}
                theme={theme}
                handleThemeChange={handleThemeChange}
              />
              <ProfileCard theme={theme}></ProfileCard>
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
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
