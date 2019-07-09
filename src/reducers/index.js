import { combineReducers } from "redux";
import weatherReducer from "./fetchDataReducer";

const allReducers = combineReducers({
  weatherReducer : weatherReducer
});
export default allReducers;