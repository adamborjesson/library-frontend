// src/components/Library/BookList.js
import React, {useState} from 'react';
import AddBook from './AddBook'

const BookList = ({ books, newBookName, newBookCategory, onBookClick }) => {
  const [visibleComponent, setVisibleComponent] = useState(null);

  const newBook = async () => {
    setVisibleComponent('addbook');
  };
  return (
    
    <div>
      
      <h2>Books:</h2>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <button
              style={bookButtonStyle}
              onClick={() => onBookClick(book.id)}
            >
              {book.name}
            </button>
          </li>
        ))}
      </ul>
      <button style={bookButtonStyle} onClick={newBook}>Add Book</button>
      {visibleComponent === 'addbook' && (
        <AddBook/>
      )}
    </div>
    
  );
  
  
};

const bookButtonStyle = {
  color: 'blue',
  textDecoration: 'underline',
  cursor: 'pointer',
  background: 'none',
  border: 'none',
  padding: '0',
  textAlign: 'left',
  width: '100%',
  font: 'inherit',
};

export default BookList;
