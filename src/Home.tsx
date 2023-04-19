import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import { LeaderboardPlayer } from "./front-end-model";
import Table from "react-bootstrap/Table";
import { durationFormatter } from "human-readable";

interface HomeProps {
  leaderboardData: LeaderboardPlayer[];
  shortestGameDuration: number;
  longestGameDuration: number;
  averageGameDuration: {
    playerCount: number;
    avgGameDuration: number;
  }[];
  reallyCoolThingHappenedPercent: number;
  reallyCoolThingHappenedPercent2: number;
  reallyCoolThingHappenedPercent3: number;
}

export const Home: React.FC<HomeProps> = ({
  leaderboardData,
  shortestGameDuration,
  longestGameDuration,
  averageGameDuration,
  reallyCoolThingHappenedPercent,
  reallyCoolThingHappenedPercent2,
  reallyCoolThingHappenedPercent3,
}) => {
  console.log(leaderboardData);

  const nav = useNavigate();

  const format = durationFormatter();

  return (
    <>
      <Button variant="outline-primary" onClick={() => nav("/setup")}>
        Play Bar
      </Button>
      <Card className="mt-3 overflow-hidden">
        <Card.Header>Leaderboard</Card.Header>
        <Card.Body>
          {leaderboardData.length == 0 && (
            <p>Play a game to see your leaderboard...</p>
          )}
          {leaderboardData.length > 0 && (
            <Table striped bordered>
              <thead>
                <tr>
                  <th>W</th>
                  <th>L</th>
                  <th>AVG</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {leaderboardData.map((x) => (
                  <tr>
                    <td>{x.wins}</td>
                    <td>{x.losses}</td>
                    <td>{x.avg}</td>
                    <td>{x.name}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
      <Card>
        <Card.Header>Game Time Fun Facts</Card.Header>
        <Card.Body>
          <p>{`${format(shortestGameDuration)} shortest game ever`}</p>
          <p>{`${format(longestGameDuration)} longest game ever`}</p>
          {averageGameDuration.length > 0 && (
            <Table striped bordered>
              <thead>
                <tr>
                  <th>Number of Players</th>
                  <th>Average Duration</th>
                </tr>
              </thead>
              <tbody>
                {averageGameDuration.map((x) => (
                  <tr>
                    <td>{x.playerCount}</td>
                    <td>{`${format(x.avgGameDuration)}`}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>

      <Card>
        <Card.Header>Non Decision (No Contest)</Card.Header>
        <Card.Body>
          <p>{`Happens ${(reallyCoolThingHappenedPercent * 100).toFixed(
            2
          )} % of games`}</p>
        </Card.Body>
      </Card>

      <Card>
        <Card.Header>Kings</Card.Header>
        <Card.Body>
          <p>{`Happens ${(reallyCoolThingHappenedPercent2 * 100).toFixed(
            2
          )} % of games`}</p>
        </Card.Body>
      </Card>

      <Card>
        <Card.Header>Double/Triple+ move accured</Card.Header>
        <Card.Body>
          <p>{`Happens ${(reallyCoolThingHappenedPercent3 * 100).toFixed(
            2
          )} % of games`}</p>
        </Card.Body>
      </Card>
    </>
  );
};
