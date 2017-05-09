import C from "./constants";
import appReducer from "./store/reducers";
import initialState from "./initialState.json";
import { createStore } from "redux";

//createStore can be passed the reducers, and optionally an initial state
const store = createStore(appReducer, initialState);

//you can also subscribe to the store and run callbacks when actions are dispatched
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

