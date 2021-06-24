import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import axios from "axios";
/// comps
import { apiCallBegan } from "./api_actions";

const slice = createSlice({
  name: "medias",
  initialState: { mediasList: [], loading: false, lastFetch: null },
  ///
  reducers: {
    /// calls
    mediasRequested: (medias, action) => {
      medias.loading = true;
    },
    mediasReceived: (medias, action) => {
      action.payload.success === true ? medias.mediasList = action.payload.data : null;
      medias.loading = false;
      medias.lastFetch = Date.now();
    },
    mediasRequestFailed: (medias, action) => {
      medias.loading = false;
    },
    mediasAssignedToUser: (medias, action) => {
      const { id: mediaId, userId } = action.payload;
      const index = medias.mediasList.findIndex(
        (media) => media.id === mediaId
      );
      medias.mediasList[index].userId = userId;
    },
    /// events
    addNewMedia: (medias, action) => {
      action.payload.success === true ?  medias.mediasList.push(action.payload.data): null;
    },

    mediaRemoved: (medias, action) => {
      medias = medias.mediasList.filter((i) => i.id !== action.payload.id);
    },

    mediaUpdated: (state, action) => {
      const index = state.mediasList.findIndex(
        (media) => media.id === action.payload.id
      );
      // console.log("found", index);
      state.mediasList[index] = {
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
  mediasRequested,
  mediasReceived,
  mediasRequestFailed,
  mediasAssignedToUser,
  addNewMedia,
  mediaRemoved,
  mediaUpdated,
} = slice.actions;
export default slice.reducer;

// Action creators

const url = "http://localhost:3000/collections";
// const header = { "Content-type": "application/x-www-form-urlencoded" };

let fetchTimer = new Date().getTime();
let initialFetch = true;
let timeDifference;

export const loadMedias = () => (dispatch, getState) => {
  // if (initialFetch) {
  //   console.log("Initiation", initialFetch, fetchTimer, timeDifference);
  //   timeDifference = 0;
  // }
  let now = new Date().getTime();
  timeDifference = now - fetchTimer;
  // console.info("Values pre-conditional :", initialFetch, timeDifference);
  if (timeDifference > 300000 || initialFetch === true) {
    fetchTimer = new Date().getTime();
    initialFetch = false;
    // console.info("Got data. Values:", initialFetch, timeDifference);
    return dispatch(
      apiCallBegan({
        url: url + "/getAll",
        onStart: mediasRequested.type,
        onSuccess: mediasReceived.type,
        onError: mediasRequestFailed.type,
      })
    );
  } else {
    // console.info(
    //   "No Diff, no fetch, keeping current data:",
    //   initialFetch,
    //   timeDifference
    // );
    return;
  }
};

export const addMedia = (mediaToAdd) =>
  apiCallBegan({
    url: url + "/addNewItem",
    method: "post",
    data: mediaToAdd,
    onSuccess: addNewMedia.type,
  });

//  url, method, headers, data, onStart, onSuccess, onError;

export const updateMedia = (id, dataToUpdate) =>
  apiCallBegan({
    url: url + "/updateItem/" + id,
    method: "patch",
    data: dataToUpdate,
    onSuccess: mediaUpdated.type,
  });

export const removeMedia = (id) =>
  apiCallBegan({
    url: url + "/deleteItem/" + id,
    method: "delete",
    data: null,
    onSuccess: mediaRemoved.type,
  });

// Selectors
export const selectSells = createSelector(
  (state) => state.medias.mediasList,
  (mediasList) => mediasList.filter((item) => item.sellable === true)
);

export const selectBooks = createSelector(
  (state) => state.medias.mediasList,
  (mediasList) => mediasList.filter((item) => item.typeOfMedia === "BOOK")
);

export const selectBooksToSell = createSelector(
  (state) => state.medias.mediasList,
  (mediasList) => mediasList.filter((item) => item.typeOfMedia === "BOOK" && item.sellable === true)
);

export const selectAudioAnalog = createSelector(
  (state) => state.medias,
  (medias) =>
    medias.mediasList.filter((item) => item.typeOfMedia === "AUDIO_ANALOG")
);

export const selectLPs = createSelector(
  (state) => state.medias,
  (medias) => medias.mediasList.filter((item) => item.subType === "LP")
);

export const selectAudioDigital = createSelector(
  (state) => state.medias,
  (medias) => medias.mediasList.filter((item) => item.typeOfMedia === "AUDIO_DIGITAL")
);

export const selectGraphic = createSelector(
  (state) => state.medias,
  (medias) => medias.mediasList.filter((item) => item.typeOfMedia === "GRAPHIC")
);

export const selectGame = createSelector(
  (state) => state.medias,
  (medias) => medias.mediasList.filter((item) => item.typeOfMedia === "GAME_MEDIA")
);


// * Categories:
// ! Books, AUDIO_Analog, Audio_Digital, Graphic, Visual_Media, Game_Media