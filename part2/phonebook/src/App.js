import { useState, useEffect } from "react";

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Person from './components/Person'
import Notification from './components/Notification'
import ErrorNotification from "./components/ErrorNotification";

import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [searchText, setSearchText] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

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
    const alreadyAddedContact = persons.find(person => JSON.stringify(person.name) === JSON.stringify(newObj.name))
    if (alreadyAddedContact) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personsService
          .updateContact(alreadyAddedContact.id, newObj)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== returnedPerson.id ? p : returnedPerson))
            setNewName('')
            setNewPhoneNumber('')
            setNotificationMessage(`Updated phone number of '${returnedPerson.name}'`)
            setTimeout(() => {
              setNotificationMessage(null)
            }, 3000)
          })
          .catch(error => {
            setNewName('')
            setNewPhoneNumber('')
            setPersons(persons.filter(p => p.id !== alreadyAddedContact.id))
            setErrorMessage(`Information of ${newName} has already been removed from server`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 3000)
          })
      }
    } else {
      // Add new person to the backend server
      personsService
        .create(newObj)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewPhoneNumber('')
          setNotificationMessage(`Added new contact '${returnedPerson.name}'`)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 3000)
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
          setNotificationMessage(`Removed contact '${name}'`)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 3000)
        })
        .catch(err => {
          setPersons(persons.filter(p => p.id !== id))
          setErrorMessage(`Information of ${name} has already been removed from server`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 3000)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} />
      <ErrorNotification message={errorMessage}/>
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
            removeContact={() => removeContact(person.id, person.name)} />
        )}
      </ul>
    </div>
  )
}

export default App