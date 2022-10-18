import { useState } from "react";

const Statistics = ({good, neutral, bad}) => {
  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <div>
        <h3>Statistics</h3>
        <span>No feedback given</span>
      </div>
    )
  }
  return (
    <>
      <h3>Statistics</h3>
      <div>good {good}</div>
      <div>neutral {neutral}</div>
      <div>bad {bad}</div>
      <div>all {good+neutral+bad}</div>
      <div>average {(good-bad) / (good+neutral+bad)}</div>
      <div>positive {good/(good+neutral+bad)*100} %</div>
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h3> Give Feedback </h3>
        <button onClick={() => setGood(good+1)}>good</button>
        <button onClick={() => setNeutral(neutral+1)}>neutral</button>
        <button onClick={() => setBad(bad+1)}>bad</button>
      <Statistics good={good} bad={bad} neutral={neutral}/>
    </div>
  )
}

export default App