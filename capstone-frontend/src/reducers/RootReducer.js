import { combineReducers } from "redux";
import { authReducer } from "./AuthReducer";
import { calReducer } from "./CalReducer";
import { uiReducer } from "./uiReducer";


export const rootReducer = combineReducers({
    ui: uiReducer,
    calendar: calReducer,
    auth: authReducer,
});