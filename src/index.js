import C from "./constants";
import appReducer from "./store/reducers";
import { createStore } from "redux";

const store = createStore(appReducer, initialState);

store.subscribe(()=> console.log(store.getState()));

store.dispatch({
  type: C.ADD_DAY,
  payload: {
    "resort": "Mt Shasta",
    "date": "2016-10-28",
    "powder": false,
    "backcountry": true
  }
});
