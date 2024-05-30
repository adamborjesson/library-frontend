// src/components/Library/Library.js
import React, { useState } from 'react';
import BookDetails from './BookDetails';
import BookList from './BookList';
import CategoryList from './CategoryList';
import CategoryDetails from './CategoryDetails'

const Library = ({
  showBooks,
  showCategories,
  getAllBooks,
  getAllCategories,
  showBook,
  getCategory,
  sellBook,
  restock,
}) => {
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [visibleComponent, setVisibleComponent] = useState(null);

  const handleBookClick = async (bookId) => {
    try {
      const bookDetails = await showBook(bookId);
      setSelectedBook(bookDetails);
      console.log('&');
      setVisibleComponent('bookDetails');
    } catch (error) {
      console.error('Error fetching book details:', error);
    }
  };

  const handleSellBook = async (bookId) => {
    try {
      const bookDetails = await sellBook(bookId);
      setSelectedBook(bookDetails);
    } catch (error) {
      console.error('Error selling book:', error);
    }
  };

  const handleRestockBook = async (bookId) => {
    try {
      const updatedBook = await restock(bookId);
      setSelectedBook(updatedBook);
      alert("Book restocked successfully!");
    } catch (error) {
      console.error('Error restocking book:', error);
    }
  };

  const handleCategoryClick = async (categoryId) => {
    try {
      const categoryDetails = await getCategory(categoryId);
      setSelectedCategory(categoryDetails);
      setVisibleComponent('categoryDetails');
    } catch (error) {
      console.error('Error fetching category details:', error);
    }
  };

  const displayBooks = async () => {
    await showBooks();
    setVisibleComponent('bookList');
  };

  const displayCategories = async () => {
    await showCategories();
    setVisibleComponent('categoryList');
  };

  return (
    <div>
      <button style={linkStyle} onClick={displayBooks}>
        Show Books
      </button>
      <br />
      <button style={linkStyle} onClick={displayCategories}>
        Show Categories
      </button>
      {visibleComponent === 'bookList' && getAllBooks && (
        <BookList books={getAllBooks} onBookClick={handleBookClick} />
      )}
      {visibleComponent === 'bookDetails' && selectedBook && (
        <BookDetails
          book={selectedBook}
          onSell={() => handleSellBook(selectedBook.id)}
          onRestock={() => handleRestockBook(selectedBook.id)}
        />
      )}
      {visibleComponent === 'categoryList' && getAllCategories && (
        <CategoryList
          categories={getAllCategories}
          onCategoryClick={handleCategoryClick}
        />
      )}
      {visibleComponent === 'categoryDetails' && selectedCategory && (
        <CategoryDetails
          category={selectedCategory}
          onBookClick={handleBookClick}
        />
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
