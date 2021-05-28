import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

let lastId = 0;

const slice = createSlice({
  name: "audio",
  initialState: [],
  reducers: {
    addBook: (state, action) => {
      state.push({
        id: ++lastId,
        category: action.payload.category,
        description: action.payload.description,
      });
    },
    removeBookById: (state, action) =>
      (state = state.filter((i) => i.id !== action.payload.id)),
    removeBookByName: (state, action) =>
      (state = state.filter((i) => i.category !== action.payload.category)),
    // TODO
    updateBook: (state, action) => {
      const { id, description, category } = action.payload;
      state[id] = { id, description, category };
    },
  },
});
export const { addBook, removeBookById, removeBookByName, updateBook } =
  slice.actions;
export default slice.reducer;

// Selectors
export const selectNovels = createSelector(
  (state) => state.entities.books,
  (books) => books.filter((b) => b.category === "novel")
);
