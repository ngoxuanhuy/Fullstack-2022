const Header = ({ name }) => (
    <h1>{name}</h1>
)

const Part = ({ part }) => (
    <p>
        {part.name} {part.exercises}
    </p>
)

const Total = ({ parts }) => {
    const total = parts.map(part => part.exercises).reduce((s, p) => s + p)
    return (
        <p><strong>Total is {total} exercises</strong></p>
    )
}

const Course = ({ courses }) => {
    const { name, parts } = courses
    return (
        <>
            <Header name={name} />
            {parts.map(part => <Part key={part.id} part={part} />)}
            <Total parts={parts} />
        </>
    )
}

export default Course