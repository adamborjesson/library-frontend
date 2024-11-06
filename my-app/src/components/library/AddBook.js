import React, { useState } from 'react';

const AddBook = ({ categories, addNewBook }) => {
  const [newBookName, setNewBookName] = useState('');
  const [newBookCategory, setNewBookCategory] = useState('');

  const handleAddBook = async () => {
    await addNewBook(newBookName, newBookCategory);
  };

  return (
    <div>
      <h2>Add a New Book</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddBook();
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
          Category:
          <select
            value={newBookCategory}
            onChange={(e) => setNewBookCategory(e.target.value)}
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AddBook;
