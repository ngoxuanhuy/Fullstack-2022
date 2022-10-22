const PersonForm = ({ addNewContact, newNameValue, handleNewName, newPhoneValue, handleNewPhoneNumber}) => {
    return (
        <form onSubmit={addNewContact}>
            <div>
                Name: <input value={newNameValue} onChange={handleNewName} />
            </div>
            <div>
                Number: <input value={newPhoneValue} onChange={handleNewPhoneNumber} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm