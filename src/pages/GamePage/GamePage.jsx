import PlayerArea from "../../components/PlayerArea/PlayerArea";
import Table from "../../components/Table/Table";
import "./GamePage.scss";
import { useState, useEffect } from "react";

export default function GamePage({
  cards,
  handleTableCardSelection,
  coins,
  fishedCards,
  player,
  handleHandCardSelection,
  theme,
  setTheme,
  handleThemeChange,
}) {
  return (
    <>
      <Table
        cards={cards}
        handleTableCardSelection={handleTableCardSelection}
        handleThemeChange={handleThemeChange}
        theme={theme}
      />
      <PlayerArea
        coins={coins}
        fishedCards={fishedCards}
        player={player}
        handleHandCardSelection={handleHandCardSelection}
        theme={theme}
      />
    </>
  );
}
