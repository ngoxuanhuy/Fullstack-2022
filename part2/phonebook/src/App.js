import { useState, useEffect } from "react";

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Person from './components/Person'

import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    personsService
      .getAll()
      .then(returnedPersons => {
        setPersons(returnedPersons)
      })
      .catch(err => alert(err))
  }, [])

  const addNewContact = (event) => {
    event.preventDefault()
    const newObj = {
      name: newName,
      number: newPhoneNumber
    }
    if (persons.find(person => JSON.stringify(person.name) === JSON.stringify(newObj.name))) {
      alert(`${newName} is already added to phonebook`)
    } else {
      // Add new person to the backend server
      personsService
        .create(newObj)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewPhoneNumber('')
        })
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

  const removeContact = (id, name) => {
    if (window.confirm(`Delete ${name} ?`)) {
      personsService
        .removeContact(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchTextValue={searchText} handleSearchName={searchName} />

      <h2>Add a new contact</h2>
      <PersonForm addNewContact={addNewContact}
        newNameValue={newName} handleNewName={handleNewName}
        newPhoneValue={newPhoneNumber} handleNewPhoneNumber={handleNewPhoneNumber} />
      <h2>Numbers</h2>
      <ul>
        {filteredContact.map(person => 
          <Person key={person.id} name={person.name} 
                  number={person.number}
                  removeContact={() => removeContact(person.id, person.name)}/>
        )}
      </ul>
    </div>
  )
}

export default App