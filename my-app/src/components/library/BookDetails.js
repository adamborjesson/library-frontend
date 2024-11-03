// src/components/Library/BookDetails.js
import React from 'react';

const BookDetails = ({ book, onSell, onRestock }) => {
  if (!book) {
    return null;
  }
  console.log(book);
  return (
    <div>
      <h2>Selected Book:</h2>
      <p>ID: {book.id}</p>
      <p>Name: {book.name}</p>
      <p>Category: {book.category}</p>
      <p>Copies: {book.copies}</p>
      <p>State: {book.state}</p>
      <button
        style={linkStyle}
        onClick={() => onSell(book.id)}
      >
        Sell Book
      </button>
      <br/>
      <button
        style={linkStyle}
        onClick={() => onRestock(book.id)}
      >
        Restock
      </button>
    </div>
  );
};

const linkStyle = {
  color: 'blue',
  textDecoration: 'underline',
  cursor: 'pointer',
  background: 'none',
  border: 'none',
  padding: '0',
  font: 'inherit',
};

export default BookDetails;
