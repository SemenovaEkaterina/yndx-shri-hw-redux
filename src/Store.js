import {mergeChanges, applyMiddleware} from './utils';

export default class Store {
    constructor(reducer, middlewares) {
        this._state = reducer();
        this._reducer = reducer;
        this._listeners = [];
        this.dispatch = applyMiddleware(this, middlewares);
    }

    // Метод подписки на изменение, mapState - массив свойств, на изменения которых нужно подписаться
    subscribe(callback) {
        this._listeners.push({callback});

        return () => {
            this._listeners = this._listeners.filter(item => item !== callback);
        }
    }

    getState() {
        return this._state;
    }

    dispatch(action) {
        this._updateState(action);
    }

    // Оповещение пользователей об изменении, keys - ключи изменившихся свойств
    _notifyListeners() {
        this._listeners.map(({callback}) => {
            callback(this.getState());
        })
    }

    // Формирование новой копии стейта с применением изменений, возвращенных из reducer'а
    _updateState(action) {
        this._state = mergeChanges(this._reducer, this._state, action);
        this._notifyListeners();
    }
}