// Rewrite deal as one function to deal for all players

export default function dealToPlayers({
  deck,
  setDeck,
  setTable,
  player,
  opponent,
}) {
  if (player.hand.length === 0 || opponent.hand.length === 0) return true;
}

// import fs from "fs";

// // Read results from a file
// export const readResults = () => {
//   try {
//     const data = fs.readFileSync("gameResults.json", "utf-8");
//     return JSON.parse(data); // Return the parsed data
//   } catch (error) {
//     console.error("Error reading file:", error);
//     return null; // Return null or handle the error as needed
//   }
// };

// // Save results to a file
// export const saveResults = (gameResults) => {
//   try {
//     fs.writeFileSync("results.json", JSON.stringify(gameResults), "utf-8");
//   } catch (error) {
//     console.error("Error writing file:", error);
//   }
// };
