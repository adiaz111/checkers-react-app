import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "bootstrap/dist/css/bootstrap.min.css";
import CardHeader from "react-bootstrap/esm/CardHeader";
// import CardHeader from "react-bootstrap/esm/CardHeader";

const Home = () => (
  <>
    <h1>TCA Bar React TS Bootstrap</h1>
    <h2>Companion App</h2>
    <Button variant="outline-primary">Play Bar</Button>
    <Card>
      <CardHeader>LeaderBoard</CardHeader>
      <Card.Body>Play a gmae ot see you leaderboard...</Card.Body>
    </Card>
  </>
);

function App() {
  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
