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
      <div className="p-2 bg-danger text-light mb-3">
        <h2 className="py-2">Play</h2>
      </div>{" "}
      <div className=" border border-2 border-danger">
        <div className=" bg-light text-dark mb-1 mt-3 border border-5 rounded-3">
          <p className="py-3 h4">Who Won</p>
        </div>
        <div className="p-4 ">
          <Form.Check
            className="d-flex flex-row p-1 m-3 h6 justify-content-center"
            label="Non Decision (No Contest)"
            type="checkbox"
            checked={happened}
            onChange={(e) => setHappened(e.target.checked)}
          />
          <Form.Check
            className="d-flex flex-row p-1 m-3 h6 justify-content-center"
            label="King"
            type="checkbox"
            checked={happened2}
            onChange={(e) => setHappened2(e.target.checked)}
          />
          <Form.Check
            className="d-flex flex-row p-1 mt-3 h6 justify-content-center"
            label="Double/Tripe+ Move Happened"
            type="checkbox"
            checked={happened3}
            onChange={(e) => setHappened3(e.target.checked)}
          />{" "}
        </div>

        {setupInfo.chosenPlayers.map((x) => (
          <Button variant="outline-danger mt-3 " onClick={() => endGame(x)}>
            {x} Won
          </Button>
        ))}
        <div>
          <Button
            className="bg-dark py-2 px-5 mb-5 mt-5"
            onClick={() => endGame("/")}
          >
            EndGame
          </Button>
        </div>
      </div>
    </>
  );
};
