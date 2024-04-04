import React, { useState } from 'react';
import App from '../App';

const Library = ({
  children,
  onGitHubLibraryClick,
  showBooks,
  showCategories,
  getAllBooks,
  getAllCategories,
  getBook,
  getCategory,
  showBook,
  sellBook,
  restock
}) => {
  const [selectedBook, setSelectedBook] = useState(null);

  const handleBookClick = async (bookId) => {
    try {
      const bookDetails = await showBook(bookId);
      setSelectedBook(bookDetails);
      console.log(selectedBook);
    } catch (error) {
      console.error('Error fetching book details:', error);
      // Handle error if needed
    }
  };

  const handleSellBook = async (bookId) => {
    try {
      const bookDetails = await sellBook(bookId);
      setSelectedBook(bookDetails);
      console.log(selectedBook);
    } catch (error) {
      console.error('Error fetching book details:', error);
      // Handle error if needed
    }
  };

  const handleRestock = async (bookId) => {
    try {
      const bookDetails = await restock(bookId);
      setSelectedBook(bookDetails);
      //console.log(selectedBook.name);
    } catch (error) {
      console.error('Error fetching book details:', error);
      // Handle error if needed
    }
  };

  // Other parts of your component...



  const handleCategoryClick = async (categoryId) => {
    try {
      await getCategory(categoryId);
    } catch (error) {
      console.error('Error fetching category details:', error);
      // Handle error if needed
    }
  };

  return (
    <div>
      <button style={linkStyle} onClick={() => onGitHubLibraryClick('School-Api')}>
        School-Api
      </button>
      <br />
      <button style={linkStyle} onClick={() => onGitHubLibraryClick('Movies')}>
        Movies
      </button>
      <br />
      <button style={linkStyle} onClick={showBooks}>
        Get All Books
      </button>
      <br />
      <button style={linkStyle} onClick={showCategories}>
        Get All Categories
      </button>
      {children}
      {getAllBooks && (
        
        <div>
          {'hej'}
          <h2>Books:</h2>
          <ul>
            {getAllBooks.map((book) => (
              <li key={book.id}>
                <button
                  style={{...linkStyle, background: 'none', border: 'none', padding: 0, textAlign: 'left', width: '100%'}}
                  onClick={() => handleBookClick(book.id)} 
                >
                  {book.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {selectedBook && (
  <div>
        {console.log('Selected Book:', selectedBook)}

    <h2>Selected Book:</h2>
    <p>Name: {selectedBook.name}</p>
    <p>Category: {selectedBook.category}</p>
    <p>Copies: {selectedBook.copies}</p>
    <p>{selectedBook.state}</p>
    <p key={selectedBook.id} onClick={() => handleSellBook(selectedBook.id)} style={{...linkStyle, background: 'none', border: 'none', padding: 0, textAlign: 'center', width: '100%'}}
>Sell Book</p>
<p key={selectedBook.id} onClick={() => handleRestock(selectedBook.id)} style={{...linkStyle, background: 'none', border: 'none', padding: 0, textAlign: 'center', width: '100%'}}
>Restock</p>
  </div>
)}

      {getAllCategories && (
        <div>
          <h2>Categories:</h2>
          <ul>
            {getAllCategories.map((category) => (
              <li key={category.id} style={{cursor: 'pointer'}} onClick={() => handleCategoryClick(category.id)}>
                {category.name}
              </li>
            ))}
          </ul>
        </div>
      )}
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

export default Library;
