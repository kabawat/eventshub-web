import { combineReducers } from "redux";
import ProfileSlice from "./slices/profile";
import eventsSlice from "./slices/events";

const rootReducer = combineReducers({
    profile: ProfileSlice,
    events: eventsSlice
})
export default rootReducer;