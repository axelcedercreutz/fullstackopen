import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { giveVote } from "../reducers/anecdoteReducer";
import {
  addNotification,
  clearNotification,
} from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const filter = useSelector((state) => state.filter);
  const anecdotes = useSelector((state) =>
    state.anecdotes
      .filter((a) => a.content.toLowerCase().includes(filter))
      .sort((a, b) => b.votes - a.votes)
  );
  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(giveVote(id));
    console.log("vote", id);
    const anecdote = anecdotes.find((a) => a.id === id);
    dispatch(addNotification(`you voted '${anecdote.content}'`));
    setTimeout(() => {
      dispatch(clearNotification());
    }, 5000);
  };

  return anecdotes.map((anecdote) => (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote.id)}>vote</button>
      </div>
    </div>
  ));
};

export default AnecdoteList;
