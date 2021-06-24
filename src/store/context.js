import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "context",
  initialState: [{ connected: true }],
  reducers: {
    setConnection: (state, action) => {
      state[0].connected = action.payload;
    },
  },
});

export const { setConnection } = slice.actions;
export default slice.reducer;
