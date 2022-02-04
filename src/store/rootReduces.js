import { combineReducers } from "redux";
import cartReducer from "./cart";
import settingReducer from "./settings";

export default combineReducers({
  cartReducer,
  settingReducer,
});
