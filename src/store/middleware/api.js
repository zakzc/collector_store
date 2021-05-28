import axios from "axios";

const api = (store) => (next) => (action) => {
  console.log("..rendered..");
};

export default api;
