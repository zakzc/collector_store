import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";

let lastId = 0;

const slice = createSlice({
  name: "audio",
  initialState: [],
  reducers: {
    addAudio: (state, action) => {
      state.push({
        id: ++lastId,
        category: action.payload.category,
        description: action.payload.description,
      });
    },
    removeAudioById: (state, action) =>
      (state = state.filter((i) => i.id !== action.payload.id)),
    removeAudioByName: (state, action) =>
      (state = state.filter((i) => i.category !== action.payload.category)),
    // TODO
    updateAudio: (state, action) => {
      const { id, description, category } = action.payload;
      state[id] = { id, description, category };
    },
  },
});
export const { addAudio, removeAudioById, removeAudioByName, updateAudio } =
  slice.actions;
export default slice.reducer;

// Selectors
export const selectAudioType = createSelector(
  (state) => state.entities.audio,
  (audio) => audio.filter((a) => a.category === "LP")
);
