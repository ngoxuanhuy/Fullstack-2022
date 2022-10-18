import { useState } from "react";

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

const StatisticLine = ({ statistic, good, bad, neutral }) => {
  if (statistic === 'good') {
    return <div>Good {good}</div>
  }
  if (statistic === 'bad') {
    return <div>Bad {bad}</div>
  }
  if (statistic === 'neutral') {
    return <div>Neutral {neutral}</div>
  }
  if (statistic === 'all') {
    return <div>All {good + bad + neutral}</div>
  }
  if (statistic === 'average') {
    return <div>Average {(good-bad) / (good+neutral+bad)}</div>
  }
  if (statistic === 'positive') {
    return <div>Positive {good/(good+neutral+bad)*100} %</div>
  }
}

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
      <StatisticLine statistic="good" good={good}/>
      <StatisticLine statistic="bad" bad={bad}/>
      <StatisticLine statistic="neutral" neutral={neutral}/>
      <StatisticLine statistic="all" good={good} bad={bad} neutral={neutral}/>
      <StatisticLine statistic="average" good={good} bad={bad} neutral={neutral}/>
      <StatisticLine statistic="positive" good={good} bad={bad} neutral={neutral}/>
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => setGood(good+1)
  const increaseNeutral = () => setNeutral(neutral+1)
  const increaseBad = () => setBad(bad+1)

  return (
    <div>
      <h3> Give Feedback </h3>
        <Button handleClick={increaseGood} text="good"/>
        <Button handleClick={increaseNeutral} text="neutral"/>
        <Button handleClick={increaseBad} text="bad"/>
      <Statistics good={good} bad={bad} neutral={neutral}/>
    </div>
  )
}

export default App