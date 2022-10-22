const Filter = ({ searchTextValue, handleSearchName }) => {
    return (
        <div>Filter shown with <input value={searchTextValue} onChange={handleSearchName} /></div>
    )
}

export default Filter