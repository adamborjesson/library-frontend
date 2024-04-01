import React from 'react';

const Library = ({
  onGitHubLibraryClick,
  showBooks,
  showCategories,
  getAllBooks,
  getAllCategories,
  getBook,
  getCategory,
}) => {

  const handleBookClick = async (book) => {
    console.log('Book clicked:', book);
    try {
      await getBook(book.id);
    } catch (error) {
      console.error('Error fetching book details:', error);
      // Handle error if needed
    }
  };

  const handleCategoryClick = async (category) => {
    console.log('Category clicked:', category);
    try {
      await getCategory(category.id);
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
      {getAllBooks && (
        <div>
        <h2>Books:</h2>
        <ul>
          {getAllBooks.map((book) => (
            <li key={book.id}>
              <button
                style={{...linkStyle, background: 'none', border: 'none', padding: 0, textAlign: 'left', width: '100%'}}
                onClick={() => handleBookClick(book)}
              >
                {book.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
      )}
      {getAllCategories && (
        <div>
          <h2>Categories:</h2>
          <ul>
            {getAllCategories.map((category) => (
              <li key={category.id} style={{cursor: 'pointer'}} onClick={() => handleCategoryClick(category)}>
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
