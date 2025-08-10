// src/redux/booksSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  books: [
    {
      id: 1,
      title: "The Martian",
      author: "Andy Weir",
      category: "Sci-Fi",
      description: "A stranded astronaut tries to survive on Mars.",
      rating: 4.7,
    },
    {
      id: 2,
      title: "Becoming",
      author: "Michelle Obama",
      category: "Non-Fiction",
      description: "The memoir of former First Lady Michelle Obama.",
      rating: 4.8,
    },
    {
      id: 3,
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      category: "Fiction",
      description: "A hobbit's adventure through Middle Earth.",
      rating: 4.9,
    },
  ],
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    addBook: (state, action) => {
      state.books.push({ ...action.payload, id: Date.now() });
    },
  },
});

export const { addBook } = booksSlice.actions;

export default booksSlice.reducer;
