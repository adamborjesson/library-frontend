import React, { useState, useEffect } from 'react';

import './App.css';
import Library from './components/library/Library';
import Spinner from './components/library/spinner/Spinner';
import './components/library/spinner/Spinner.css';


const baseUrl = 'https://library-backend.azurewebsites.net/api';
const bookUrl = `${baseUrl}/books`;
const categoryUrl = `${baseUrl}/categories`;


function App() {
  const [showLibrary, setShowLibrary] = useState(false);
  const [books, setBooks] = useState(null);
  const [categories, setCategories] = useState(null);
  const [selectedBook] = useState(null);
  const [newBookName, setNewBookName] = useState('');
  const [newBookCategory, setNewBookCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [deleteMessage, setDeleteMessage] = useState('');



  useEffect(() => {
    console.log(selectedBook);
  }, [selectedBook]);

  const handleShowLibrary = () => {
    setShowLibrary(!showLibrary);
  };

  const handleGitHubLibraryClick = (repoName) => {
    console.log(`GitHub ${repoName} link clicked!`);
    window.open(`https://github.com/adamborjesson/${repoName}`);
  };

  const showBooks = async () => {
    setLoading(true); 
    try {
      const response = await fetch(`${bookUrl}/get/all`);
      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false); 
    }
  };

  const addBook = async (newBookName, newBookCategory) => {
    setLoading(true);
    await fetch(`${categoryUrl}/get/all`);
    await fetch(`${bookUrl}/get/all`);
    const bookData = {
      name: newBookName,
      categoryId: newBookCategory,
    };
    try {
      const response = await fetch(`${bookUrl}/post/book`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookData),
      });
      if (!response.ok) {
        throw new Error('Failed to add book');
      }
    } catch (error) {
      console.error('Error adding book:', error);
    } finally {
      setLoading(false);
    }
  };

  const search = async (bookName) => {
    console.log(2);
    setLoading(true);
    setErrorMessage(''); 
    try {
      const response = await fetch(`${bookUrl}/get/book/by/name/${bookName}`);
      if (!response.ok) {
        throw new Error('Failed to fetch book details');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      setErrorMessage(`Error fetching book details: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const showBook = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`${bookUrl}/get/book/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch book details');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching book details:', error);
    } finally {
      setLoading(false);
    }
  };

  const sellBook = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`${bookUrl}/sell/book/${id}`);
      if (!response.ok) {
        throw new Error('Failed to sell book');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error selling book:', error);
    } finally {
      setLoading(false);
    }
  };

  const restock = async (bookId) => {
    setLoading(true);
    try {
      const bookData = {
        id: bookId,
        copies: 10
    };
    const response = await fetch(`${bookUrl}/restock`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookData),
  });
      if (!response.ok) {
        throw new Error('Failed to fetch book details');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching book details:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteBook = async (bookId) => {
    setLoading(true);
    try {
      const bookData = {
        id: bookId,
        copies: 10
    };
    const response = await fetch(`${bookUrl}/delete/${bookId}`, {
      method: 'DELETE'});
      if (!response.ok) {
        throw new Error('Failed to fetch book details');
      }
      setDeleteMessage(`Deleted`);
    } catch (error) {
      console.error('Error fetching book details:', error);
    } finally {
      setLoading(false);
    }
  };

  const showCategories = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${categoryUrl}/get/all`);
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCategory = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`${categoryUrl}/get/category/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch category details');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching category details:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Library App</h1>
        <button onClick={handleShowLibrary}>
          {showLibrary ? 'Hide Library' : 'Show Library'}
        </button>
        {loading ? (
        <Spinner /> 
      ) : (
        
          <div></div>
      )}
      <div>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
          </div>
      <div>
          {deleteMessage && <p style={{ color: 'red' }}>{deleteMessage}</p>}
        </div>
        {showLibrary && (
          <Library
            onGitHubLibraryClick={handleGitHubLibraryClick}
            showBooks={showBooks}
            showCategories={showCategories}
            getAllBooks={books}
            getAllCategories={categories}
            showBook={showBook}
            getCategory={getCategory}
            sellBook={sellBook}
            restock={restock}
            addBook={addBook}
            search={search}
            deleteBook={deleteBook}
          >
            
          </Library>
        )}
      </header>
    </div>
  );
}

export default App;
