import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import CardHeader from "react-bootstrap/esm/CardHeader";

export const Home = () => {
  return (
    <>
      <Button variant="outline-primary">Play Bar</Button>
      <Card className="mt-3">
        <CardHeader>LeaderBoard</CardHeader>
        <Card.Body>Play a game to see you leaderboard...</Card.Body>
      </Card>
    </>
  );
};
