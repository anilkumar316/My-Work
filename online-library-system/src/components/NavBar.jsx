import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={styles.nav}>
      <h2>📚 Online Library</h2>
      <div>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/browse" style={styles.link}>Browse Books</Link>
        <Link to="/add" style={styles.link}>Add Book</Link>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    background: '#1e3a8a',
    color: 'white'
  },
  link: {
    margin: '0 1rem',
    color: 'white',
    textDecoration: 'none',
    fontWeight: 'bold'
  }
};

export default Navbar;
