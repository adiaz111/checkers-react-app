import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { GameResult, SetupInfo } from "./front-end-model";
import Form from "react-bootstrap/Form";
import { useState } from "react";

interface PlayProps {
  addGameResultFunc: (r: GameResult) => void;
  setupInfo: SetupInfo;
}

export const Play: React.FC<PlayProps> = ({ addGameResultFunc, setupInfo }) => {
  console.log(setupInfo);

  const [happened, setHappened] = useState(false);
  const [happened2, setHappened2] = useState(false);
  const [happened3, setHappened3] = useState(false);

  const nav = useNavigate();

  const endGame = (winner: string) => {
    addGameResultFunc({
      winner: winner,
      players: setupInfo.chosenPlayers,
      start: setupInfo.start,
      end: new Date().toISOString(),
      reallyCoolThingHappened: happened,
      reallyCoolThingHappened2: happened2,
      reallyCoolThingHappened3: happened3,
    });

    nav(-2);
  };

  return (
    <>
      <h2>Play</h2>
      <Form.Check
        label="Really Cool thing happened"
        type="checkbox"
        checked={happened}
        onChange={(e) => setHappened(e.target.checked)}
      />
      <Form.Check
        label="King"
        type="checkbox"
        checked={happened2}
        onChange={(e) => setHappened2(e.target.checked)}
      />
      <Form.Check
        label="Double/Tripe+ Move Happened"
        type="checkbox"
        checked={happened3}
        onChange={(e) => setHappened3(e.target.checked)}
      />{" "}
      {setupInfo.chosenPlayers.map((x) => (
        <Button variant="outline-primary" onClick={() => endGame(x)}>
          {x} Won
        </Button>
      ))}
    </>
  );
};
