import { createSlice } from "@reduxjs/toolkit";

let lastId = 0;

const slice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    addUser: (state, action) => {
      state.push({ id: ++lastId, description: action.payload.description });
    },
    removeUser: (state, action) => {
      state.filter((user) => user.id !== action.payload.id);
    },
  },
});

export const { addUser, removeUser } = slice.actions;
export default slice.reducer;
