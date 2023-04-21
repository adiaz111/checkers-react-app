import { useState } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { SetupInfo } from "./front-end-model";
import Form from "react-bootstrap/Form";

export interface SetupProps {
  previousPlayers: string[];
  setSetupInfo: (info: SetupInfo) => void;
}

export const Setup: React.FC<SetupProps> = ({
  previousPlayers,
  setSetupInfo,
}) => {
  const nav = useNavigate();

  const [chosenPlayers, setChosenPlayers] = useState(
    previousPlayers.map((x) => ({
      name: x,
      checked: false,
    }))
  );

  const [newPlayerName, setNewPlayerName] = useState("");

  const togglePlayer = (name: string) =>
    setChosenPlayers(
      chosenPlayers.map((x) => ({
        ...x,
        checked: x.name == name ? !x.checked : x.checked,
      }))
    );

  const startGame = () => {
    setSetupInfo({
      start: new Date().toISOString(),
      chosenPlayers: chosenPlayers.filter((x) => x.checked).map((x) => x.name),
    });
    nav("/play");
  };

  const validateAndAddNewPlayer = () => {
    // Validate first...
    if (
      newPlayerName.length == 0 ||
      chosenPlayers.some((x) => x.name.localeCompare(newPlayerName) == 0)
    ) {
      return;
    }

    setChosenPlayers([
      ...chosenPlayers,
      {
        name: newPlayerName,
        checked: true,
      },
    ]);

    setNewPlayerName("");
  };

  return (
    <>
      <div className="p-2 bg-danger text-light border border-danger mb-3">
        <h2 className="py-2">Setup Game</h2>
      </div>

      <div className="p-4 border border-5 border-light">
        <h4 className="py-3 mb-3">Choose Two Players</h4>
        <Button
          variant="outline-danger"
          className="px-3 py-2"
          onClick={startGame}
        >
          Start Game
        </Button>
      </div>
      <Form className=" p-5 mt-3 border border-3 border-danger">
        <Form.Group className="" controlId="exampleForm.ControlInput1">
          <Form.Label className="text-dark px-5 mb-4 h4">
            Add Players
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter new player name"
            value={newPlayerName}
            onChange={(e) => setNewPlayerName(e.target.value)}
          />
          <Button
            className="px-3 py-2"
            variant="outline-danger m-5"
            onClick={validateAndAddNewPlayer}
          >
            Add New Player
          </Button>
        </Form.Group>
        {chosenPlayers.map((x) => (
          <Form.Check
            className="d-flex flex-row p-1 h6 justify-content-center"
            checked={x.checked}
            label={" -- " + x.name}
            onChange={() => togglePlayer(x.name)}
          />
        ))}
      </Form>
    </>
  );
};
