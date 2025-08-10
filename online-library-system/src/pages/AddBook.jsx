import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBook } from '../redux/booksSlice';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const AddBook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    author: '',
    category: '',
    description: '',
    rating: ''
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!form.title) errs.title = 'Title is required';
    if (!form.author) errs.author = 'Author is required';
    if (!form.category) errs.category = 'Category is required';
    if (!form.description) errs.description = 'Description is required';
    if (!form.rating || isNaN(form.rating) || form.rating < 1 || form.rating > 5)
      errs.rating = 'Rating must be between 1 and 5';
    return errs;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    dispatch(
      addBook({
        id: uuidv4(),
        ...form,
        rating: parseFloat(form.rating)
      })
    );
    navigate('/browse');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Add a New Book</h2>
      <form onSubmit={handleSubmit}>
        {['title', 'author', 'category', 'description', 'rating'].map((field) => (
          <div key={field} style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontWeight: 'bold' }}>{field.toUpperCase()}:</label>
            <input
              type={field === 'rating' ? 'number' : 'text'}
              name={field}
              value={form[field]}
              onChange={handleChange}
              style={{ width: '100%', padding: '0.5rem' }}
            />
            {errors[field] && <p style={{ color: 'red' }}>{errors[field]}</p>}
          </div>
        ))}
        <button type="submit" style={styles.button}>Add Book</button>
      </form>
    </div>
  );
};

const styles = {
  button: {
    padding: '0.5rem 1rem',
    background: '#1e40af',
    color: 'white',
    border: 'none',
    borderRadius: '4px'
  }
};

export default AddBook;
