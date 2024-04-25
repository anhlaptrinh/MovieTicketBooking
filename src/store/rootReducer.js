import { combineReducers } from "redux";
import chairReducer from "./chairReducer";

const rootReducer = combineReducers({
    chairReducer,
});
export default rootReducer;