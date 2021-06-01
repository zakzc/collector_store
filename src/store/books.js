import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

let lastId = 0;

const slice = createSlice({
  name: "books",
  initialState: [],
  reducers: {
    addBook: (state, action) => {
      state.push({
        id: ++lastId,
        collector: action.payload.collector,
        typeOfMedia: action.payload.typeOfMedia,
        title: action.payload.title,
        author: action.payload.author,
        genre: action.payload.genre,
        mediaID: action.payload.mediaID,
        quantity: action.payload.quantity,
        sellable: action.payload.sellable,
        dateOfPurchase: action.payload.dateOfPurchase,
        price: action.payload.price,
        details: action.payload.details,
      });
    },
    removeBookById: (state, action) =>
      (state = state.filter((i) => i.id !== action.payload.id)),
    removeBookByName: (state, action) =>
      (state = state.filter((i) => i.title !== action.payload.title)),
    updateBook: (state, action) => {
      console.log("received", action.payload.id);
      const index = state.findIndex((book) => book.id === action.payload.id);
      console.log("found", index);
      state[index] = {
        id: action.payload.id,
        collector: action.payload.collector,
        typeOfMedia: action.payload.typeOfMedia,
        title: action.payload.title,
        author: action.payload.author,
        genre: action.payload.genre,
        mediaID: action.payload.mediaID,
        quantity: action.payload.quantity,
        sellable: action.payload.sellable,
        dateOfPurchase: action.payload.dateOfPurchase,
        price: action.payload.price,
        details: action.payload.details,
      };
    },
  },
});

export const { addBook, removeBookById, removeBookByName, updateBook } =
  slice.actions;
export default slice.reducer;

// Selectors
export const selectSells = createSelector(
  (state) => state.entities.books,
  (books) => books.filter((b) => b.sellable === true)
);
