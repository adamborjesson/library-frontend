import React, { useState } from 'react';

const Search = ({searchBar}) => {
    const [searchName, setSearchName] = useState('');

    const handleSearch = async () => {
        await searchBar(searchName);
      };
    
    return (
    <div>
        <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
      >
        <label>
          Book Name:
          <input
            type="text"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
        </label>
        <button type="submit">Search</button>
      </form>
    </div>
    );
};
export default Search;