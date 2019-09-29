import {mergeChanges} from "./utils";

// Позволяет структорировать стейт
export default (reducers) => {
    return (state = {}, action) => {
        const newState = state || {};
        Object.entries(reducers).map(([key, reducer]) => {
            newState[key] = mergeChanges(reducer, newState[key], action);
        });
        return newState;
    }
}