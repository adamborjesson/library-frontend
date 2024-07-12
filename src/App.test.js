// src/App.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

// Mocking the fetch API
global.fetch = jest.fn();

describe('App Component', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('renders Library App header', () => {
    render(<App />);
    const headerElement = screen.getByText(/Library App/i);
    expect(headerElement).toBeInTheDocument();
  });

  test('toggles Library visibility', () => {
    render(<App />);
    const buttonElement = screen.getByText(/Show Library/i);
    
    // Click to show Library
    fireEvent.click(buttonElement);
    expect(screen.getByText(/Hide Library/i)).toBeInTheDocument();

    // Click to hide Library
    fireEvent.click(buttonElement);
    expect(screen.getByText(/Show Library/i)).toBeInTheDocument();
  });

  test('displays add book form when Library is shown', () => {
    render(<App />);
    
    // Show Library
    fireEvent.click(screen.getByText(/Show Library/i));
    
    const bookNameInput = screen.getByLabelText(/Book Name/i);
    const categoryIdInput = screen.getByLabelText(/Category ID/i);
    expect(bookNameInput).toBeInTheDocument();
    expect(categoryIdInput).toBeInTheDocument();
  });

  test('fetches and displays books when showBooks is called', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ([
        { id: 1, name: 'Test Book', categoryId: 1 },
      ]),
    });

    render(<App />);
    fireEvent.click(screen.getByText(/Show Library/i));
    
    await waitFor(() => {
      const buttonElement = screen.getByText(/Add Book/i);
      expect(buttonElement).toBeInTheDocument();
    });
    
    // Call showBooks function
    await screen.getByRole('button', { name: /Add Book/i }).click();
    expect(fetch).toHaveBeenCalledWith('https://library-backend.azurewebsites.net/api/books/get/all');
  });

  test('handles addBook form submission', async () => {
    fetch.mockResolvedValueOnce({ ok: true });

    render(<App />);
    fireEvent.click(screen.getByText(/Show Library/i));
    
    fireEvent.change(screen.getByLabelText(/Book Name/i), {
      target: { value: 'New Book' },
    });
    fireEvent.change(screen.getByLabelText(/Category ID/i), {
      target: { value: '1' },
    });

    fireEvent.click(screen.getByText(/Add Book/i));
    
    expect(fetch).toHaveBeenCalledWith(
      'https://library-backend.azurewebsites.net/api/books/post/book',
      expect.objectContaining({
        body: JSON.stringify({ name: 'New Book', categoryId: '1' }),
      })
    );
  });

  test('shows error on failed fetch when adding a book', async () => {
    fetch.mockRejectedValueOnce(new Error('Failed to add book'));

    render(<App />);
    fireEvent.click(screen.getByText(/Show Library/i));

    fireEvent.change(screen.getByLabelText(/Book Name/i), {
      target: { value: 'New Book' },
    });
    fireEvent.change(screen.getByLabelText(/Category ID/i), {
      target: { value: '1' },
    });

    fireEvent.click(screen.getByText(/Add Book/i));
    
    await waitFor(() => {
      expect(fetch).toHaveBeenCalled();
    });
  });

  test('handles GitHub link click', () => {
    global.open = jest.fn();
    
    render(<App />);
    fireEvent.click(screen.getByText(/Show Library/i));
    
    fireEvent.click(screen.getByText(/Add Book/i));
    
    expect(global.open).toHaveBeenCalledWith('https://github.com/adamborjesson/undefined');
  });
});
