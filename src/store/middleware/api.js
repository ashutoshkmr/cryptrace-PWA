import axios from "axios";
import * as actions from "../apiActions";

const axiosInstance = axios.create({
  baseURL: "https://min-api.cryptocompare.com",
});

const api = ({ dispatch }) => (next) => async (action) => {
  if (action.type !== actions.apiCallBegan.type) return next(action);

  const {
    url,
    apiKeyRequired,
    params,
    onStart,
    onSuccess,
    onError,
  } = action.payload;

  if (onStart) dispatch({ type: onStart, payload: action.payload });

  next(action);

  try {
    if (apiKeyRequired) {
      params["api_key"] =
        "b55bbc60475233e1c108a755950a18c8773fae47f2a2b908f66baeeaf50bc458";
    }

    const response = await axiosInstance.get(url, { params });
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
