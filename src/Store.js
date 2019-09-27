import * as _ from 'lodash';

export default class Store {
    constructor(reducer, middleware) {
        this._state = reducer();
        this._reducer = reducer;
        this._middleware = middleware;
        this._listeners = [];
    }

    // Метод подписки на изменение, mapState - массив свойств, на изменения которых нужно подписаться
    subscribe(callback, mapState) {
        this._listeners.push({callback, mapState});

        return () => {
            this._listeners = this._listeners.filter(item => item !== callback);
        }
    }

    getState() {
        return this._state;
    }

    dispatch(action) {
        this._updateState(action);
        this._middleware.map(item => item.process(this.getState(), this.dispatch.bind(this), action));
    }

    // Оповещение пользователей об изменении, keys - ключи изменившихся свойств
    _notifyListeners(keys) {
        this._listeners.map(({callback, mapState}) => {
            if (keys.some(item => mapState.includes(item))) {
                callback(this.getState());
            }
        })
    }

    // Формирование новой копии стейта с применением изменений, возвращенных из reducer'а
    _updateState(action) {
        // Изменения
        const changeResult = this._reducer(this._state, action);
        // Новая копия
        const newState = _.clone(this._state);

        // Массив обновленных ключей
        const keys = [];
        Object.entries(changeResult).map(([key, value]) => {
            newState[key] = _.clone(value);
            keys.push(key);
        });
        this._state = newState;
        this._notifyListeners(keys);
    }
}