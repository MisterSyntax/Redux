import C from "../constants";
import appReducer from "./reducers";
import { createStore, applyMiddleware } from "redux";

/**
 * @description - gives us the action that is currently being dispatched, a mechanism to dispatch that action and change the state
 */
const consoleMessages = (store) => (next) => (action) => {

    let result;
    
    //before dispatching the action
    console.groupCollapsed(`dispatching action => ${action.type} `);
    console.log("ski days", store.getState().allSkiDays.length);

    //dispatching the action
    result = next(action);

    //after dispatching the action
    let { allSkiDays, goal, errors, resortNames } = store.getState();

    console.log(`
    
        ski days ${allSkiDays.length}
        goal: ${goal}
        fetching: ${resortNames.fetching}
        suggestions: ${resortNames.suggestions}

    `);

    console.groupEnd();

    return result;

};

export default (initialState={}) => {
    return applyMiddleware(consoleMessages)(createStore)(appReducer,initialState);
};