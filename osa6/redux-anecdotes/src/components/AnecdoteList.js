import React from "react";
import { connect } from "react-redux";
import { giveVote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = (props) => {
  const vote = (id) => {
    const anecdote = props.anecdotes.find((a) => a.id === id);
    const updatedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };
    props.giveVote(updatedAnecdote);
    props.setNotification(`you voted '${anecdote.content}'`, 5);
  };

  return props.anecdotes.map((anecdote) => (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote.id)}>vote</button>
      </div>
    </div>
  ));
};

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes
      .filter((a) => a.content.toLowerCase().includes(state.filter))
      .sort((a, b) => b.votes - a.votes),
  };
};
const mapDispatchToProps = {
  giveVote,
  setNotification,
};

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList);
