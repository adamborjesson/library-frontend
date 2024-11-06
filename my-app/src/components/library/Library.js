// src/components/Library/Library.js
import React, { useState } from 'react';
import BookDetails from './BookDetails';
import BookList from './BookList';
import CategoryList from './CategoryList';
import CategoryDetails from './CategoryDetails';
import AddBook from './AddBook';
import Search from './Search';
import Spinner from './spinner/Spinner';
import './spinner/Spinner.css';


const Library = ({
  showBooks,
  showCategories,
  getAllBooks,
  getAllCategories,
  showBook,
  getCategory,
  sellBook,
  restock,
  addBook,
  search,
  deleteBook,
}) => {
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [visibleComponent, setVisibleComponent] = useState(null);

  const searchBar = async (bookName) => {
    console.log(1);
    const bookDetails = await search(bookName);
      setSelectedBook(bookDetails);
      setVisibleComponent('bookDetails');
  };

  const newBook = async () => {
    await showCategories();

    setVisibleComponent('addbook');
  };

  const addNewBook = async (newBookName, newBookCategory) => {
    console.log('Book Added:', { name: newBookName, category: newBookCategory });
    await addBook(newBookName, newBookCategory);
  };

  const handleBookClick = async (bookId) => {
    try {
      const bookDetails = await showBook(bookId);
      setSelectedBook(bookDetails);
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

  const handleDelete = async (bookId) => {
    await deleteBook(bookId);
    setSelectedBook(null);
  }

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

  const searchBook = async () => {
    setVisibleComponent('search');
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
      <br />
      <button style={linkStyle} onClick={newBook}>
        Add Book
      </button>
      <br/>
      <button style={linkStyle} onClick={searchBook}>
        Search Bar
      </button>
      {visibleComponent === 'bookList' && getAllBooks && (
        <BookList books={getAllBooks} onBookClick={handleBookClick} />
      )}
      {visibleComponent === 'bookDetails' && selectedBook && (
        <BookDetails
          book={selectedBook}
          onSell={() => handleSellBook(selectedBook.id)}
          onRestock={() => handleRestockBook(selectedBook.id)}
          onDelete={() => handleDelete(selectedBook.id)}
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
      {visibleComponent === 'addbook' && (
        <AddBook 
        categories={getAllCategories} 
        addNewBook={addNewBook}
        />
      )} 
      {visibleComponent === 'search' && (
        <Search
          searchBar={searchBar}
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
