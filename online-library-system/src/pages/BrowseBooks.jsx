import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SearchBar from '../components/SearchBar';

const BrowseBooks = () => {
  const { category } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const books = useSelector((state) => state.books.list);

  const filteredBooks = books.filter((book) => {
    const matchesCategory = !category || book.category.toLowerCase() === category.toLowerCase();
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Browse Books {category && ` - ${category}`}</h2>
      <SearchBar onSearch={setSearchTerm} />

      {filteredBooks.map((book) => (
        <div key={book.id} style={styles.bookCard}>
          <h3>{book.title}</h3>
          <p>Author: {book.author}</p>
          <p>Category: {book.category}</p>
          <Link to={`/book/${book.id}`} style={styles.link}>View Details</Link>
        </div>
      ))}
    </div>
  );
};

const styles = {
  bookCard: {
    border: '1px solid #ddd',
    borderRadius: '6px',
    padding: '1rem',
    marginBottom: '1rem',
    background: '#f1f5f9'
  },
  link: {
    color: '#1d4ed8',
    textDecoration: 'underline'
  }
};

export default BrowseBooks;
