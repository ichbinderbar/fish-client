import fs from "fs";

export const saveResults = (gameResults) => {
  fs.writeFileSynch("results.json", JSON.stringify(gameResults));
  return true;
};

export const readResults = () => {
  const data = fs.readFileSync("results.json", "utf-8");
};
