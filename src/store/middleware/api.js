import axios from "axios";
import * as actions from "../api_actions";

const api =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    // console.log("Call for:\n", action);
    if (action.type !== actions.apiCallBegan.type) return next(action);
    const { url, method, data, onStart, onSuccess, onError } = action.payload;
    if (onStart) dispatch({ type: onStart });
    next(action);
    try {
      const response = await axios.request({
        baseURL: "http://localhost:3000/",
        url,
        method,
        data,
      });
      // general call
      dispatch(actions.apiCallSuccess(response.data));
      // specific
      if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
    } catch (error) {
      // general error
      dispatch(actions.apiCallFailed(error.message));
      // specific
      if (onError) dispatch({ type: onError, payload: error.message });
    }
  };

export default api;
