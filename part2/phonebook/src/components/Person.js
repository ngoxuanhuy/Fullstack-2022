const Person = ({ name, number, removeContact }) => {
    return(
        <div>
            {name} {number} 
            <button onClick={removeContact}>Delete</button>
        </div>    
    )
}

export default Person