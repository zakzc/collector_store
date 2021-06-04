import configureStore from "./store/configureStore";
import {
  addAudio,
  removeAudioById,
  removeAudioByName,
  updateAudio,
  selectAudioType,
} from "./store/audio";
import {
  loadBooks,
  addBook,
  removeBookById,
  removeBookByName,
  updateBook,
  selectSells,
  updateBookById,
} from "./store/books";
import { addUser, removeUser, updateUser } from "./store/users";

const store = configureStore();

const unsubscribe = store.subscribe(() => {
  // console.log("Store for books\n", store.getState().entities.books);
});

store.dispatch(loadBooks());
// store.dispatch(addUser({ description: "User 1" }));
// store.dispatch(addUser({ description: "User 2" }));
store.dispatch(
  addBook({
    collector: "60a381a917b50e24c02df7bb",
    typeOfMedia: "H",
    title: "Queen Margot",
    author: ["Alexandre Dumas"],
    genre: "non-fiction",
    mediaID: "32345",
    quantity: 3,
    sellable: true,
    dateOfPurchase: "10/1/1987",
    price: 235.23,
    details: "nothing",
  })
);
// store.dispatch(
//   addBook({
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
// store.dispatch(removeBookById({ id: 1 }));
// store.dispatch(
//   addBook({
//     collector: "60a381a917b50e24c02df7bb",
//     typeOfMedia: "H",
//     title: "The Count of Mount Christ",
//     author: ["Alexandre Dumas"],
//     genre: "fiction",
//     edition: 13,
//     mediaID: "523465",
//     quantity: 1,
//     sellable: false,
//     dateOfPurchase: "10/1/1987",
//     price: 135.23,
//     details: "something",
//   })
// );
// store.dispatch(removeBookByName({ description: "Book 2" }));
// store.dispatch(
//   addBook({
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
//   updateBookById({
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

let toSell = selectSells(store.getState());
console.log("\b To sell here: ", toSell);
let getLPs = selectAudioType(store.getState());
console.log("LPs here: ", getLPs);

unsubscribe();
