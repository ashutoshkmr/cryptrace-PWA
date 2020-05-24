import axios from "axios";
import * as actions from "../apiActions";

const api = ({ dispatch }) => (next) => async (action) => {
  if (action.type !== actions.apiCallBegan.type) return next(action);

  console.log(action);

  const { url, params, onStart, onSuccess, onError } = action.payload;

  if (onStart) dispatch({ type: onStart });

  next(action);

  try {
    const response = axios.get(url, { params });
    // @ts-ignore
    dispatch(actions.apiCallSuccess(response.data));
    // @ts-ignore
    if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
  } catch (error) {
    // @ts-ignore
    dispatch(actions.apiCallFailed(error.message));
    if (onError) dispatch({ type: onError, payload: error.message });
  }
};

export default api;
