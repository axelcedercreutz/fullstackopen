import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const emptyArray = Array.apply(null, new Array(props.anecdotes.length)).map(
    Number.prototype.valueOf,
    0
  );
  const [votes, setVotes] = useState(emptyArray);

  const highestVotedId = votes
    .map((value, index) => {
      const returnObject = {
        v: value,
        i: index,
      };
      return returnObject;
    })
    .reduce((a, b) => (a.v > b.v ? a : b), {});

  const handleVote = () => {
    const newVotes = [...votes];
    newVotes[selected] = newVotes[selected] + 1;
    setVotes(newVotes);
  };

  const handleClick = () => {
    const newRandNumber = Math.floor(Math.random() * props.anecdotes.length);
    setSelected(newRandNumber);
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {props.anecdotes[selected]}
      <br />
      {"has " + votes[selected] + " votes"}
      <br />
      <button onClick={() => handleVote()}>vote</button>
      <button onClick={() => handleClick()}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      {props.anecdotes[highestVotedId.i]}
      <br />
      {"has " + votes[highestVotedId.i] + " votes"}
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
