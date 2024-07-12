// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import Library from './components/library/Library';

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
    }
  };

  const addBook = async () => {
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
    }
  };

  const showBook = async (id) => {
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
    }
  };

  const sellBook = async (id) => {
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
    }
  };

  const restock = async (bookId) => {
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
    }
  };

  const showCategories = async () => {
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
    }
  };

  const getCategory = async (id) => {
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
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Library App</h1>
        <button onClick={handleShowLibrary}>
          {showLibrary ? 'Hide Library' : 'Show Library'}
        </button>
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
          >
            <div>
              <h2>Add a New Book</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  addBook();
                }}
              >
                <label>
                  Book Name:
                  <input
                    type="text"
                    value={newBookName}
                    onChange={(e) => setNewBookName(e.target.value)}
                  />
                </label>
                <label>
                  Category ID:
                  <input
                    type="text"
                    value={newBookCategory}
                    onChange={(e) => setNewBookCategory(e.target.value)}
                  />
                </label>
                <button type="submit">Add Book</button>
              </form>
            </div>
          </Library>
        )}
      </header>
    </div>
  );
}

export default App;
