export default class Store {
    constructor(reducer, middleware) {
        this._state = reducer();
        this._reducer = reducer;
        this._middleware = middleware;
        this._listeners = [];
    }

    _notifyListeners() {
        this._listeners.map(item => {
            item(this.getState());
        })
    }

    subscribe(callback) {
        this._listeners.push(callback);

        return () => {
            this._listeners = this._listeners.filter(item => item !== callback);
        }
    }

    dispatch(action) {
        this._state = this._reducer(this._state, action);
        this._notifyListeners();
        this._middleware.map(item => item.process(this.getState(), this.dispatch.bind(this), action));
    }

    getState() {
        return this._state;
    }
}