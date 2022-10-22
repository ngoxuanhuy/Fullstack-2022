import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [searchText, setSearchText] = useState('')

  const addNewContact = (event) => {
    event.preventDefault()
    const newObj = {
      name: newName,
      number: newPhoneNumber
    }
    if (persons.find(person => JSON.stringify(person.name) === JSON.stringify(newObj.name))) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(newObj))
      setNewName('')
    }
  }

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewPhoneNumber = (event) => {
    setNewPhoneNumber(event.target.value)
  }

  const searchName = (event) => {
    setSearchText(event.target.value)
  }

  const filteredContact = !searchText 
    ? persons
    : persons.filter(person => JSON.stringify(person.name).toLowerCase().includes(searchText.toLowerCase()) === true)

  return (
    <div>
      <h2>Phonebook</h2>
      <div>filter shown with <input value={searchText} onChange={searchName}/></div>
      <h2>Add a new contact</h2>
      <form onSubmit={addNewContact}>
        <div>
          Name: <input value={newName} onChange={handleNewName}/>
        </div>
        <div>
          Number: <input value={newPhoneNumber} onChange={handleNewPhoneNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {filteredContact.map((person, i) => <li key={i}>{person.name} {person.number}</li>)}
      </ul>
    </div>
  )
}

export default App