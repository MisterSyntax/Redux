import C from "./constants";
import appReducer from "./store/reducers";
import { createStore } from "redux";

/**
 * @description Store - have the following methods
 * @function createStore - creates a store
 * @function subscribe - listens for dispatched actions to a store and run a callbacks
 * @function unsubscribe - stops listening for dispatched actions
 */


//if the initial state exists use it, else empty state
const initialState = localStorage["redux-store"] ? JSON.parse(localStorage["redux-store"]) : {};

//createStore can be passed the reducers, and optionally an initial state
const store = createStore(appReducer, initialState);

//great for testing bad for prod
// allows you to console.log stuff like: store.dispatch({ type: "SET_GOAL", payload:12})
window.store = store;

//you can also subscribe to the store and run callbacks when actions are dispatched
var unSubscribeFunction = store.subscribe(() => console.log(store.getState()));

//you can store the state of the app in local storage so when a user comes back they keep the state of the app
store.subscribe(()=>{
  const state = JSON.stringify(store.getState());
  localStorage["redux-store"] = state;
});


store.dispatch({
  type: C.ADD_DAY,
  payload: {
    "resort": "Mt Shasta",
    "date": "2016-10-28",
    "powder": false,
    "backcountry": true
  }
});

store.dispatch({
  type: C.SET_GOAL,
  payload: 20
});

//can unsubscribe with the function returned by the store.subscribe function
unSubscribeFunction();