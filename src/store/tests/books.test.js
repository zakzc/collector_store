import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { loadBooks, addBook } from "../books";
import configureStore from "../configureStore";

describe("Test for book slice", () => {
  let fakeAxios;
  let store;
  beforeEach(() => {
    fakeAxios = new MockAdapter(axios);
    store = configureStore();
  });

  const booksSlice = () => store.getState().entities.books;

  describe("loading books", () => {
    describe("If books in the cache", () => {
      it("they should not be fetched from the server again", async () => {
        fakeAxios.onGet("/books/getAll").reply(200, [{ id: 1 }]);
        await store.dispatch(loadBooks());
        await store.dispatch(loadBooks());

        expect(fakeAxios.history.get.length).toBe(1);
      });
    });
    describe("loading indicator", () => {
      it("should be true while fetching data", () => {
        fakeAxios.onGet("books/getAll").reply(() => {
          expect(booksSlice().loading).toBe(true);
          return [200, [{ id: 1 }]];
        });
        store.dispatch(loadBooks());
      });
      it("should be false after data is fetched", async () => {
        fakeAxios.onGet("/books/getAll").reply(200, [{ id: 1 }]);
        await store.dispatch(loadBooks());
        expect(booksSlice().loading).toBe(false);
      });
    });
  });

  //   describe("adding books", () => {
  //     it("should add a book", async () => {
  //       const fakeBook = { description: "fakeBook" };
  //       const savedBook = { ...fakeBook, id: 1 };
  //       fakeAxios
  //         .onPost("/addNewItem")
  //         .reply(200, { success: true, data: savedBook });
  //       await store.dispatch(addBook(fakeBook));
  //       console.log("===\n", booksSlice());
  //       expect(booksSlice().listOfBooks).toBe(true);
  //       //   expect(booksSlice().data).toContainEqual(savedBook);
  //     });
  //     it("should not add a book if it not saved to the server", async () => {
  //       const fakeBook2 = { id: 2 };
  //       fakeAxios.onPost("./addNewItem").reply(500);
  //       await store.dispatch(addBook(fakeBook2));
  //       expect(booksSlice().listOfBooks).toHaveLength(0);
  //     });
  //   });
});
