/**Create middleware - gives us power over how the action is dispatched
    -can launch functionality before/after action is dispatched
    -can delay or skip actions
    -applyMiddleware - applies function to store and makes sure everything gets good args

-When you use this in your file, you'll be able to have things happen before and after your functions
    */

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


//consoleMessages is higher order function
//createStore is the store we're creating
//appReducer is the being run to run the reducers
export default (initialState={}) => {
    return applyMiddleware(consoleMessages)(createStore)(appReducer,initialState);
};

