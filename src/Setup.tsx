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
      <h2>Setup Game</h2>
      <h5>Choose Two Players</h5>
      <Button variant="outline-danger" onClick={startGame}>
        Start Game
      </Button>
      <Form className="mt-5 p-5 border">
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label className="text-dark px-5 py-3 h5">
            Add Players
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter new player name"
            value={newPlayerName}
            onChange={(e) => setNewPlayerName(e.target.value)}
          />
          <Button
            variant="outline-danger m-5"
            onClick={validateAndAddNewPlayer}
          >
            Add New Player
          </Button>
        </Form.Group>
        {chosenPlayers.map((x) => (
          <Form.Check
            className="d-flex flex-row p-1 h6 justify-content-center"
            label={x.name}
            checked={x.checked}
            onChange={() => togglePlayer(x.name)}
          />
        ))}
      </Form>
    </>
  );
};
