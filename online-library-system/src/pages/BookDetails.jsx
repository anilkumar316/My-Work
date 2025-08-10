import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const books = useSelector((state) => state.books.list);
  const book = books.find((b) => b.id.toString() === id);

  if (!book) {
    return <div style={{ padding: '2rem' }}>Book not found.</div>;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>{book.title}</h1>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Category:</strong> {book.category}</p>
      <p><strong>Description:</strong> {book.description}</p>
      <p><strong>Rating:</strong> ⭐ {book.rating}</p>
      <button onClick={() => navigate('/browse')} style={styles.button}>⬅ Back to Browse</button>
    </div>
  );
};

const styles = {
  button: {
    marginTop: '1rem',
    padding: '0.5rem 1rem',
    background: '#1e40af',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};

export default BookDetail;
