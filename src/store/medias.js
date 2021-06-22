import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import axios from "axios";
/// comps
import { apiCallBegan } from "./api_actions";

const slice = createSlice({
  name: "medias",
  initialState: { listOfMedias: [], loading: false, lastFetch: null },
  ///
  reducers: {
    /// calls
    mediasRequested: (medias, action) => {
      medias.loading = true;
    },
    mediasReceived: (medias, action) => {
      medias.listOfMedias = action.payload.data;
      medias.loading = false;
      medias.lastFetch = Date.now();
    },
    mediasRequestFailed: (medias, action) => {
      medias.loading = false;
    },
    mediasAssignedToUser: (medias, action) => {
      const { id: mediaId, userId } = action.payload;
      const index = medias.listOfMedias.findIndex(
        (media) => media.id === mediaId
      );
      medias.listOfMedias[index].userId = userId;
    },
    /// events
    mediaAdded: (medias, action) => {
      medias.listOfMedias.push(action.payload.data);
      console.log("added", medias.listOfMedias);
    },

    mediaRemoved: (medias, action) => {
      medias = medias.listOfMedias.filter((i) => i.id !== action.payload.id);
    },

    mediaUpdated: (state, action) => {
      const index = state.listOfMedias.findIndex(
        (media) => media.id === action.payload.id
      );
      // console.log("found", index);
      state.listOfMedias[index] = {
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
  mediaAdded,
  mediaRemoved,
  mediaUpdated,
} = slice.actions;
export default slice.reducer;

// Action creators

const url = "http://localhost:3000/collections/";
// const header = { "Content-type": "application/x-www-form-urlencoded" };

let fetchTimer = new Date().getTime();
let initialFetch = true;
let timeDifference;

export const loadmedias = () => (dispatch, getState) => {
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

export const addmedia = (media) =>
  apiCallBegan({
    url: url + "/addNewItem",
    method: "post",
    data: media,
    onSuccess: mediaAdded.type,
  });

//  url, method, headers, data, onStart, onSuccess, onError;

export const updatemedia = (id, dataToUpdate) =>
  apiCallBegan({
    url: url + "/updateItem/" + id,
    method: "patch",
    data: dataToUpdate,
    onSuccess: mediaUpdated.type,
  });

export const removemedia = (id) =>
  apiCallBegan({
    url: url + "/deleteItem/" + id,
    method: "delete",
    data: null,
    onSuccess: mediaRemoved.type,
  });

// Selectors
export const selectSells = createSelector(
  (state) => state.entities.medias,
  (medias) => medias.listOfmedias.filter((b) => b.sellable === true)
);
