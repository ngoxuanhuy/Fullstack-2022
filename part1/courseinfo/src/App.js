const Header = ({name}) => (
  <h1>{name}</h1>
)

const Part = ({part}) => (
  <p>
    {part.name} {part.exercises}
  </p>
)

const Total = ({parts}) => {
  let total = 0
  parts.map(part => total += part.exercises)
  return (
    <p><strong>Total of {total} exercises</strong></p>
  )
}

const Course = ({courses}) => {
  const {name, parts} = courses
  return (
    <>
      <Header name={name}/>
      {parts.map(part => <Part key={part.id} part={part}/>)}
      <Total parts={parts}/>
    </>
  )
}

const App = () => {
  const courses = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course courses={courses}/>
}

export default App;
