import { combineReducers } from "redux";
import messageReducer from "./messageReducer";
import buttonReducer from "./buttonReducer";
import userReducer from "./usersReducer";

export default combineReducers({
  messageReducer,
  buttonReducer,
  userReducer,
});
