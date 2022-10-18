import { useState } from "react";

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

const StatisticLine = ({ statistic, good, bad, neutral }) => {
  if (statistic === 'good') {
    return( 
      <>
        <td>Good</td>
        <td>{good}</td>
      </>
    )
  }
  if (statistic === 'bad') {
    return( 
      <>
        <td>Bad</td>
        <td>{bad}</td>
      </>
    )
  }
  if (statistic === 'neutral') {
    return( 
      <>
        <td>Neutral</td>
        <td>{neutral}</td>
      </>
    )
  }
  if (statistic === 'all') {
    return( 
      <>
        <td>All</td>
        <td>{good + bad + neutral}</td>
      </>
    )
  }
  if (statistic === 'average') {
    return( 
      <>
        <td>Average</td>
        <td>{(good-bad) / (good+neutral+bad)}</td>
      </>
    )
  }
  if (statistic === 'positive') {
    return( 
      <>
        <td>Positive</td>
        <td>{good/(good+neutral+bad)*100} %</td>
      </>
    )
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
      <table>
        <tbody>
          <tr><StatisticLine statistic="good" good={good}/></tr>
          <tr><StatisticLine statistic="bad" bad={bad}/></tr>
          <tr><StatisticLine statistic="neutral" neutral={neutral}/></tr>
          <tr><StatisticLine statistic="all" good={good} bad={bad} neutral={neutral}/></tr>
          <tr><StatisticLine statistic="average" good={good} bad={bad} neutral={neutral}/></tr>
          <tr><StatisticLine statistic="positive" good={good} bad={bad} neutral={neutral}/></tr>
        </tbody>
      </table>
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