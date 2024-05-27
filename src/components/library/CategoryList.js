// src/components/Library/CategoryList.js
import React from 'react';

const CategoryList = ({ categories, onCategoryClick }) => {
  return (
    <div>
      <h2>Categories:</h2>
      <ul>
        {categories.map((category) => (
          <li
            key={category.id}
            style={{ cursor: 'pointer' }}
            onClick={() => onCategoryClick(category.id)}
          >
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
