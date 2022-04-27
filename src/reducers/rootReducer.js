import { combineReducers } from "redux-immutable";

import demo from "./demoReducer";
import homework from "./homeworkReducer";
import { connectRouter } from "connected-react-router";

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    demo,
    homework,
  });

export default createRootReducer;
