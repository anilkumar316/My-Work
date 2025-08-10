import React from 'react';
import { Link } from 'react-router-dom';

const BookCard = ({ book }) => {
  return (
    <div style={styles.card}>
      <h3>{book.title}</h3>
      <p>by {book.author}</p>
      <Link to={`/book/${book.id}`} style={styles.link}>View More</Link>
    </div>
  );
};

const styles = {
  card: {
    padding: '1rem',
    border: '1px solid #ddd',
    borderRadius: '8px',
    marginBottom: '1rem',
    background: '#f8f9fa'
  },
  link: {
    color: '#1e40af',
    textDecoration: 'underline'
  }
};

export default BookCard;
