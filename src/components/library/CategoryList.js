// src/components/Library/CategoryList.js
import React from 'react';

const CategoryList = ({ categories, onCategoryClick }) => {
  return (
    <div>
      <h2>Categories:</h2>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
          <button
            style={categoryButtonStyle}
            onClick={() => onCategoryClick(category.id)}
          >
            {category.name}
          </button>
        </li>
        ))}
      </ul>
    </div>
  );
};

const categoryButtonStyle = {
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

export default CategoryList;
