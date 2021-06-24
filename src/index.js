import configureStore from "./store/configureStore";
import { setConnection } from "./store/context";
import {
  loadMedias,
  addMedia,
  removeMedia,
  updateMedia,
  selectSells,
  selectBooks,
  selectAudioAnalog,
  selectLPs,
  selectBooksToSell
} from "./store/medias";
import { addUser, removeUser, updateUser } from "./store/users";

const store = configureStore();

const unsubscribe = store.subscribe(() => {});

store.dispatch(loadMedias());

// store.dispatch(addUser({ description: "User 1" }));
// store.dispatch(addUser({ description: "User 2" }));
// store.dispatch(setConnection(false));
store.dispatch(
  addMedia({
    collector: "60a381a917b50e24c02df7bb",
    typeOfMedia: "Book",
    title: "Queen Margot",
    author: "Alexandre Dumas",
    subType: "Novel",
    mediaID: "32345",
    quantity: 3,
    sellable: true,
    dateOfPurchase: "1987-10-01",
    price: 235.23,
    details: "nothing",
  })
);

// store.dispatch(
//   addMedia({
//     collector: "60a381a917b50e24c02df7bb",
//     typeOfMedia: "P",
//     title: "The 3 mosqueteers",
//     author: ["Alexandre Dumas"],
//     genre: "fiction",
//     mediaID: "32345",
//     quantity: 2,
//     sellable: true,
//     dateOfPurchase: "10/1/1987",
//     price: 235.23,
//     details: "nothing",
//   })
// );
// store.dispatch(removeMediaById({ id: 1 }));
// store.dispatch(
//   addMedia({
//     collector: "60a381a917b50e24c02df7bb",
//     typeOfMedia: "H",
//     title: "The Count of Mount Christ",
//     author: ["Alexandre Dumas"],
//     genre: "fiction",
//     mediaID: "523465",
//     quantity: 1,
//     sellable: false,
//     dateOfPurchase: "10/1/1987",
//     price: 135.23,
//     details: "something",
//   })
// );
// store.dispatch(removeMediaByName({ description: "media 2" }));
// store.dispatch(
//   addMedia({
//     collector: "60a381a917b50e24c02df7bb",
//     typeOfMedia: "H",
//     title: "Twenty years after",
//     author: ["Alexandre Dumas"],
//     genre: "fiction",
//     mediaID: "52165",
//     quantity: 1,
//     sellable: true,
//     dateOfPurchase: "10/1/1987",
//     price: 155.23,
//     details: "something",
//   })
// );
// store.dispatch(addAudio({ description: "Great album 1", category: "CD" }));
// store.dispatch(updateUser({ id: 2, description: "Nice user 2" }));
// store.dispatch(addAudio({ description: "Nice album 2", category: "LP" }));
// store.dispatch(
//   updateMediaById({
//     id: 2,
//     collector: "Paul",
//     typeOfMedia: "paperback",
//     title: "The man in the iron mask",
//     author: "Dumas",
//     genre: "fiction",
//     mediaID: "32345",
//     quantity: 2,
//     sellable: true,
//     dateOfPurchase: "10/1/1987",
//     price: 235.23,
//     details: "nothing",
//   })
// );
// store.dispatch(
//   updateMedia("60bdd6a442dfaaadaaf40cfb", {
//     collector: "60a381a917b50e24c02df7bb",
//     typeOfMedia: "H",
//     title: "Queen Margot",
//     author: ["Alexandre Dumas"],
//     genre: "non-fiction",
//     mediaID: "32345",
//     quantity: 1,
//     sellable: false,
//     dateOfPurchase: "10/1/1987",
//     price: 135.23,
//     details: "This was updated",
//     notes: "2nd edition. ",
//   })
// );

// store.dispatch(
//   addMedia({
//     collector: "60a381a917b50e24c02df7bb",
//     typeOfMedia: "AUDIO_Analog",
//     title: "Houses of the Holy",
//     author: "Led Zeppelin",
//     subType: "LP",
//     mediaID: "121245",
//     quantity: 3,
//     sellable: true,
//     dateOfPurchase: "1987-10-01",
//     price: 235.23,
//     details: "nothing",
//   })
// );

// store.dispatch(removeMedia("60bbca3a3b0f21816c48dbc6"));

let timeFunctionDueToAsyncFetchOfData = setTimeout(() => {
  const checkMe = store.getState().medias;
  console.log("ck", checkMe);
  let tod = selectSells(store.getState());
  console.log("\b To sell: ", tod, typeof tod);
  let bookOnly = selectBooks(store.getState());
  console.log("\b Books: ", bookOnly);
  let bookSell = selectBooksToSell(store.getState());
  console.log("b to se", bookSell)
  let getAudio = selectAudioAnalog(store.getState());
  console.log("Anal here: ", getAudio);
  let getLP = selectLPs(store.getState());
  console.log("Lps: ", getLP)
}, 3000);

store.dispatch(setConnection(true));
// const checkMe = store.getState().medias;
// console.log("ck", checkMe);
// const checkMe2 = store.getState().context;

// console.log("ck2", checkMe2);

unsubscribe();
