import React from 'react';

const CategoryDetails = ({category, onBookClick}) => {

    console.log(category);
    return (
        <div>
          <h2>Books:</h2>
          <ul>
            {category.books.map((book) => (
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
  
  export default CategoryDetails;
