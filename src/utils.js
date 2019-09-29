import * as _ from 'lodash';

// Клонирование стора и запись изменений, полученных из редьюсера
export const mergeChanges = (reducer, state, action) => {
    // Изменения
    const changeResult = reducer(state, action);
    // Новая копия
    const newState = _.clone(state) || {};

    Object.entries(changeResult).map(([key, value]) => {
        newState[key] = _.clone(value);
    });
    return newState;
};

export const applyMiddleware = (store, middlewares) => {
    let dispatch = store.dispatch.bind(store);
    middlewares.map(item => {
        dispatch = item(store)(dispatch);
    });
    return dispatch;
};