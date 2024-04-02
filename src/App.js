import React, { useState, useEffect } from 'react';
import './App.css';
import Library from './library/Library';

const baseUrl = 'https://library-backend.azurewebsites.net/api';
const bookUrl = baseUrl + '/books';
const categoryUrl = baseUrl + '/categories';

function App() {
  const [showLibrary, setShowLibrary] = useState(false);
  const [books, setBooks] = useState(null);
  const [categories, setCategories] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null); // State to hold selected book
  const [isLoading, setIsLoading] = useState({ books: false, categories: false });
  const [error, setError] = useState({ books: null, categories: null });

  // useEffect to log selectedBook when it changes
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
    setIsLoading(prev => ({ ...prev, books: true }));
    try {
      const response = await fetch(`${bookUrl}/get/all`);
      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error('Error fetching books:', error);
      setError(prev => ({ ...prev, books: error.message }));
    } finally {
      setIsLoading(prev => ({ ...prev, books: false }));
    }
  };

  const showBook = async (id) => {
    setIsLoading(prev => ({ ...prev, books: true }));
    try {
      const response = await fetch(`${bookUrl}/get/book/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch book details');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching book details:', error);
      setError(prev => ({ ...prev, books: error.message }));
    } finally {
      setIsLoading(prev => ({ ...prev, books: false }));
    }
  };

  const showCategories = async () => {
    setIsLoading(prev => ({ ...prev, categories: true }));
    try {
      const response = await fetch(`${categoryUrl}/get/all`);
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setError(prev => ({ ...prev, categories: error.message }));
    } finally {
      setIsLoading(prev => ({ ...prev, categories: false }));
    }
  };

  const getCategory = async (id) => {
    setIsLoading(prev => ({ ...prev, categories: true }));
    try {
      const response = await fetch(`${categoryUrl}/get/category/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch category details');
      }
      const data = await response.json();
      console.log('Category details:', data);
    } catch (error) {
      console.error('Error fetching category details:', error);
      setError(prev => ({ ...prev, categories: error.message }));
    } finally {
      setIsLoading(prev => ({ ...prev, categories: false }));
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Library</h1>
        <div>
          <button className='library' onClick={handleShowLibrary}>
            {showLibrary ? 'Hide Library' : 'Show Library'}
          </button>
          {showLibrary && (
            <Library
              onGitHubLibraryClick={handleGitHubLibraryClick}
              showBooks={showBooks}
              showCategories={showCategories}
              getAllBooks={books}
              getAllCategories={categories}
              showBook={showBook} // Pass showBook function, not selectedBook state
              getCategory={getCategory}
            />
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
