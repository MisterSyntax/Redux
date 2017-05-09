import C from "../constants";
import { combineReducers } from "redux";

/**
 * @desc: reducer for managing all Ski Days
 *  -either add or removes an error from the state
 * @param: state - an array of skiDays, default to empty Array
 * @param: action - ADD_Days
 * @returns: new state which is all days modified as requested
 */
export const allSkiDays = (state = [], action) => {

    switch (action.type) {
        //COMPOSE REDUCERS
        //WE already created a reducer for getting idividual ski days, we can use that for add days
        case C.ADD_DAY: {
            /**
             * @desc: checks to see if the date has already been used and is set to true if already used else fale
             */
            const hasDay = state.some((currentDay) => {
                return (currentDay.date === action.payload.date) ? true : false;
            });

            return (hasDay) ?
                state :
                [
                    ...state,
                    skiDay(null, action)
                ];
        }

        case C.REMOVE_DAY: {
            return state.filter((currentDay) => {
                return (currentDay.date !== action.payload);
            });
        }

        default: {
            return state;
        }

    }

};

/**ES6 default parameter example with state=10 */
/**
 * @desc: reducer for goal
 * @param: state - with default state set to 10
 * @param: action - the action has a payload and a type and any other properties used by the calling file
 */
export const goal = (state = 10, action) =>
    (action.type === C.SET_GOAL) ?
        parseInt(action.payload) :
        state;


/**
 * @desc: reducer for errors
 *  -either add or removes an error from the state
 * @param: state - an array of errors, default to null
 * @param: action - ADD_ERROR or CLEAR_ERRORS
 * @returns: new state
 */
export const errors = (state = [], action) => {

    //action.type is either ADD_ERROR or CLEAR_ERROR
    switch (action.type) {

        case C.ADD_ERROR: {
            return [
                ...state,
                action.payload
            ];
        }

        case C.CLEAR_ERROR: {
            return state.filter((message, index) => index !== action.payload ? true : false);
        }

        default:
            return state;
    }
};


/**
 * @desc: reducer for skiDay
 * @param: state - with default state set to 10
 * @param: action - the action has a payload and a type and any other properties used by the calling file
 */
export const skiDay = (state, action) =>
    (action.type === C.ADD_DAY) ?
        action.payload :
        state;


/**
 * @desc: reducer for maintaining the state of fetching resort names and canceling fetching
 * @param: state - an array of skiDays, default to false
 * @param: action - FETCH_RESORT_NAMES, C.CANCEL_FETCHING, CHANGE_SUGGESTIONS
 *  
 * @returns: new state wether or not we're fetching resort names
 */
export const fetching = (state = false, action) => {

    switch (action.type) {
        case C.FETCH_RESORT_NAMES: {
            return true;
        }
        case C.CHANGE_SUGGESTIONS: {
            return false;
        }
        case C.CANCEL_FETCHING: {
            return false;
        }
        default: {
            return state;
        }

    }
};


/**
 * @desc: reducer for getting suggestions and clearing suggestions
 *  @param {array} state - an array of resort names, defaults to []
 *  @param {Object} action - the  action
 *  @param {string} action.type - CHANGE_SUGGESTIONS or CLEAR_SUGGESTIONS
 * 
 * @desc - C.CHANGE_SUGGESTIONS: updates the suggestion to the provided suggestions
 *  @param {Object} action.payload - an array of suggestions
 *  @returns: an array of resort names as the state
 * 
 * @desc - C.CLEAR_SUGGESTIONS: clears the suggestions
 *  @returns: an empty array of suggestions
 * 
 */
export const suggestions = (state = [], action) => {

    switch (action.type) {
        case C.CHANGE_SUGGESTIONS: {
            return action.payload;
        }
        case C.CLEAR_SUGGESTIONS: {
            return [];
        }
        default: {
            return state;
        }

    }
};

//the reduced export
export default combineReducers({
    allSkiDays,
    goal,
    errors,
    resortNames: combineReducers({
        fetching,
        suggestions
    })
});