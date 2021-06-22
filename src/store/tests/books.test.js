import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { loadmedias, addmedia } from "../medias";
import configureStore from "../configureStore";

describe("Test for media slice", () => {
  let fakeAxios;
  let store;
  beforeEach(() => {
    fakeAxios = new MockAdapter(axios);
    store = configureStore();
  });

  const mediasSlice = () => store.getState().entities.medias;

  describe("loading medias", () => {
    describe("If medias in the cache", () => {
      it("they should not be fetched from the server again", async () => {
        fakeAxios.onGet("/medias/getAll").reply(200, [{ id: 1 }]);
        await store.dispatch(loadmedias());
        await store.dispatch(loadmedias());

        expect(fakeAxios.history.get.length).toBe(1);
      });
    });
    describe("loading indicator", () => {
      it("should be true while fetching data", () => {
        fakeAxios.onGet("medias/getAll").reply(() => {
          expect(mediasSlice().loading).toBe(true);
          return [200, [{ id: 1 }]];
        });
        store.dispatch(loadmedias());
      });
      it("should be false after data is fetched", async () => {
        fakeAxios.onGet("/medias/getAll").reply(200, [{ id: 1 }]);
        await store.dispatch(loadmedias());
        expect(mediasSlice().loading).toBe(false);
      });
    });
  });

  //   describe("adding medias", () => {
  //     it("should add a media", async () => {
  //       const fakemedia = { description: "fakemedia" };
  //       const savedmedia = { ...fakemedia, id: 1 };
  //       fakeAxios
  //         .onPost("/addNewItem")
  //         .reply(200, { success: true, data: savedmedia });
  //       await store.dispatch(addmedia(fakemedia));
  //       console.log("===\n", mediasSlice());
  //       expect(mediasSlice().listOfmedias).toBe(true);
  //       //   expect(mediasSlice().data).toContainEqual(savedmedia);
  //     });
  //     it("should not add a media if it not saved to the server", async () => {
  //       const fakemedia2 = { id: 2 };
  //       fakeAxios.onPost("./addNewItem").reply(500);
  //       await store.dispatch(addmedia(fakemedia2));
  //       expect(mediasSlice().listOfmedias).toHaveLength(0);
  //     });
  //   });
});
