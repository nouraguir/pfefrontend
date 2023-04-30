import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import EventReducer from "./eventReducer";
import EventsReducer from "./eventsReducer";
import modalReducer from "./modelReducer"
import profileReducer from "./profile"

export default combineReducers({
  auth: authReducer,
  event: EventReducer ,
  events: EventsReducer,
  modalStatus: modalReducer,
  errors: errorReducer,
  profile: profileReducer
});