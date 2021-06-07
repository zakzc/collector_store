import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import axios from "axios";
import { apiCallBegan } from "./api_actions";
import moment from "moment";

let lastId = 0;

const slice = createSlice({
  name: "books",
  initialState: { listOfBooks: [], loading: false, lastFetch: null },
  ///
  reducers: {
    /// calls
    booksRequested: (books, action) => {
      books.loading = true;
    },
    booksReceived: (books, action) => {
      books.listOfBooks = action.payload.data;
      books.loading = false;
      books.lastFetch = Date.now();
    },
    booksRequestFailed: (books, action) => {
      books.loading = false;
    },
    booksAssignedToUser: (books, action) => {
      const { id: mediaId, userId } = action.payload;
      const index = books.listOfBooks.findIndex((book) => book.id === mediaId);
      books.listOfBooks[index].userId = userId;
    },
    /// events
    bookAdded: (books, action) => {
      books.listOfBooks.push(action.payload.data);
    },

    bookRemoved: (books, action) => {
      console.log("received", action.payload.id);
      books = books.listOfBooks.filter((i) => i.id !== action.payload.id);
    },

    bookUpdated: (state, action) => {
      console.log("received", action.payload.id);
      const index = state.listOfBooks.findIndex(
        (book) => book.id === action.payload.id
      );
      console.log("found", index);
      state.listOfBooks[index] = {
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

export const {
  booksRequested,
  booksReceived,
  booksRequestFailed,
  booksAssignedToUser,
  bookAdded,
  bookRemoved,
  bookUpdated,
} = slice.actions;
export default slice.reducer;

// Action creators

const url = "http://localhost:3000/collections/books";
// const header = { "Content-type": "application/x-www-form-urlencoded" };

export const loadBooks = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.books;
  const timeSinceLastFetch = moment().diff(moment(lastFetch), "minutes");
  if (timeSinceLastFetch < 10) return;

  return dispatch(
    apiCallBegan({
      url: url + "/getAll",
      onStart: booksRequested.type,
      onSuccess: booksReceived.type,
      onError: booksRequestFailed.type,
    })
  );
};

export const addBook = (book) =>
  apiCallBegan({
    url: url + "/addNewItem",
    method: "post",
    data: book,
    onSuccess: bookAdded.type,
  });

// ! url, method, headers, data, onStart, onSuccess, onError;

export const updateBook = (id, dataToUpdate) =>
  apiCallBegan({
    url: url + "/updateItem/" + id,
    method: "patch",
    data: dataToUpdate,
    onSuccess: bookUpdated.type,
  });

export const removeBook = (id) =>
  apiCallBegan({
    url: url + "/deleteItem/" + id,
    method: "delete",
    data: null,
    onSuccess: bookRemoved.type,
  });

// Selectors
export const selectSells = createSelector(
  (state) => state.entities.books,
  (books) => books.listOfBooks.filter((b) => b.sellable === true)
);
