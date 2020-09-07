import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = (props) => {
  const { text, onClick } = props;
  return <button onClick={onClick}>{text}</button>;
};

const StatisticLine = (props) => {
  const { text, value, decoration } = props;
  return (
    <tr>
      <td>{text}</td>
      <td>
        {value} {decoration && decoration}
      </td>
    </tr>
  );
};

const Statistics = (props) => {
  const { good, neutral, bad } = props;

  const total = good + neutral + bad;
  const average = total !== 0 ? (good * 1 + bad * -1) / total : 0;
  const positivePercentage = total !== 0 ? (good * 100) / total : 0;
  return (
    <>
      <h1>statistics</h1>
      {total !== 0 ? (
        <table>
          <tbody>
            <StatisticLine text={"good"} value={good} />
            <StatisticLine text={"neutral"} value={neutral} />
            <StatisticLine text={"bad"} value={bad} />
            <StatisticLine text={"total"} value={total} />
            <StatisticLine text={"average"} value={average} />
            <StatisticLine
              text={"positive"}
              value={positivePercentage}
              decoration={"%"}
            />
          </tbody>
        </table>
      ) : (
        <p>No feedback given</p>
      )}
    </>
  );
};

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleButtonClick = (button) => {
    button === "good"
      ? setGood(good + 1)
      : button === "neutral"
      ? setNeutral(neutral + 1)
      : setBad(bad + 1);
  };

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button text={"good"} onClick={() => handleButtonClick("good")} />
        <Button text={"neutral"} onClick={() => handleButtonClick("neutral")} />
        <Button text={"bad"} onClick={() => handleButtonClick("bad")} />
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
