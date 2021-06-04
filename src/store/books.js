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
      console.log(
        "Received:",
        books.listOfBooks,
        typeof books.listOfBooks,
        action.payload.data,
        typeof action.payload.data
      );
      // const newArrayOfBooks = [...books.listOfBooks, action.payload.data];
      // books.listOfBooks = newArrayOfBooks;
      books.listOfBooks.push(action.payload.data);
    },
    bookRemovedById: (state, action) =>
      (state = state.listOfBooks.filter((i) => i.id !== action.payload.id)),
    bookRemovedByName: (state, action) =>
      (state = state.listOfBooks.filter(
        (i) => i.title !== action.payload.title
      )),
    bookUpdated: (state, action) => {
      console.log("received", action.payload.id);
      const index = state.listOfBooks.findIndex(
        (book) => book.id === action.payload.id
      );
      console.log("found", index);
      state.listOfBooks[index] = {
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

export const {
  booksRequested,
  booksReceived,
  booksRequestFailed,
  booksAssignedToUser,
  bookAdded,
  bookRemovedById,
  bookRemovedByName,
  bookUpdated,
} = slice.actions;
export default slice.reducer;

// Action creators

const url = "http://localhost:3000/collections/books";
const header = { "Content-type": "application/x-www-form-urlencoded" };

export const loadBooks = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.books;
  const timeSinceLastFetch = moment().diff(moment(lastFetch), "minutes");
  if (timeSinceLastFetch < 10) return;

  return dispatch(
    apiCallBegan({
      url: url + "/getAll",
      headers: header,
      onStart: booksRequested.type,
      onSuccess: booksReceived.type,
      onError: booksRequestFailed.type,
    })
  );
};

export const addBook = (book) =>
  apiCallBegan({
    url: url + "/addNewItem",
    method: "POST",
    headers: header,
    data: book,
    onSuccess: bookAdded.type,
  });

export const updateBookById = (id, dataToUpdate) =>
  apiCallBegan({
    url: url + "/" + id,
    method: "PATCH",
    data: dataToUpdate,
    onSuccess: bookRemovedById.type,
  });

export const updateBookByName = (name, dataToUpdate) =>
  apiCallBegan({
    url: "http://localhost:3000/" + "/updateItem/" + id,
    method: "patch",
    data: dataToUpdate,
    onSuccess: bookRemovedByName.type,
  });

// Selectors
export const selectSells = createSelector(
  (state) => state.entities.books,
  (books) => books.listOfBooks.filter((b) => b.sellable === true)
);
