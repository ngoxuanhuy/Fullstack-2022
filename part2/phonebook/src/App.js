import { useState, useEffect } from "react";

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then(response => {
        setPersons(response.data)
      })
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
      axios
        .post("http://localhost:3001/persons", newObj)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewPhoneNumber('')
        })
        .catch(err => {
          alert(err)
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

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchTextValue={searchText} handleSearchName={searchName} />

      <h2>Add a new contact</h2>
      <PersonForm addNewContact={addNewContact}
        newNameValue={newName} handleNewName={handleNewName}
        newPhoneValue={newPhoneNumber} handleNewPhoneNumber={handleNewPhoneNumber} />
      <h2>Numbers</h2>
      <Persons filteredContact={filteredContact} />
    </div>
  )
}

export default App