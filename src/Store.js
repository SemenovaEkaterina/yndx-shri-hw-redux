export default class Store {
    constructor(reducer) {
        this._state = reducer();
        this._reducer = reducer;
        this._listeners = [];
    }

    _notifyListeners() {
        this._listeners.map(item => {
            item(this.getState());
        })
    }

    subscribe(callback) {
        this._listeners.push(callback);
    }
    dispatch(action) {
        this._state = this._reducer(this._state, action);
        this._notifyListeners();
    }
    getState() {
        return this._state;
    }
}