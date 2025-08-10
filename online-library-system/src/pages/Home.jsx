import React from 'react';
import BookCard from '../components/BookCard';

const categories = ['Fiction', 'Non-Fiction', 'Sci-Fi'];
const popularBooks = [
  { id: 1, title: '1984', author: 'George Orwell' },
  { id: 3, title: 'Dune', author: 'Frank Herbert' },
  { id: 5, title: 'The Hobbit', author: 'J.R.R. Tolkien' }
];

const Home = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Welcome to the Online Library 📖</h1>

      <section style={{ marginTop: '2rem' }}>
        <h2>Book Categories</h2>
        <ul style={{ display: 'flex', gap: '1rem', listStyle: 'none', padding: 0 }}>
          {categories.map((cat, i) => (
            <li key={i} style={{ background: '#e0e7ff', padding: '0.5rem 1rem', borderRadius: '5px' }}>
              {cat}
            </li>
          ))}
        </ul>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>Popular Books</h2>
        {popularBooks.map(book => (
          <BookCard key={book.id} book={book} />
        ))}
      </section>
    </div>
  );
};

export default Home;
