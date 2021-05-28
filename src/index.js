import configureStore from "./store/configureStore";
import {
  addAudio,
  removeAudioById,
  removeAudioByName,
  updateAudio,
  selectAudioType,
} from "./store/audio";
import {
  addBook,
  removeBookById,
  removeBookByName,
  updateBook,
  selectNovels,
} from "./store/books";
import { addUser } from "./store/users";

const store = configureStore();

const unsubscribe = store.subscribe(() => {
  console.log("Store for books\n", store.getState().entities.books);
});

store.dispatch(addUser({ description: "User 1" }));
store.dispatch(addUser({ description: "User 2" }));
store.dispatch(addBook({ description: "Book 1", category: "novel" }));
store.dispatch(addBook({ description: "Book 2", category: "romance" }));
store.dispatch(removeBookById({ id: 1 }));
store.dispatch(addBook({ description: "Book 3", category: "graphic" }));
store.dispatch(removeBookByName({ description: "Book 2" }));
store.dispatch(addBook({ description: "Book 4", category: "novel" }));
store.dispatch(addAudio({ description: "Great album 1", category: "CD" }));
store.dispatch(addAudio({ description: "Nice album 2", category: "LP" }));
store.dispatch(
  updateBook({ id: 3, description: "new Book 3", category: "thriller" })
);

let getNovels = selectNovels(store.getState());

console.log("\nNovels here: ", getNovels);

unsubscribe();
