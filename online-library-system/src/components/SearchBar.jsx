import React from 'react';

const SearchBar = ({ onSearch }) => {
  return (
    <input
      type="text"
      placeholder="Search by title or author..."
      onChange={(e) => onSearch(e.target.value)}
      style={{
        padding: '0.5rem',
        width: '100%',
        marginBottom: '1rem',
        border: '1px solid #ccc',
        borderRadius: '4px'
      }}
    />
  );
};

export default SearchBar;
