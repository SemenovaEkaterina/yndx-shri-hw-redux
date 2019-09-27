export default class Middleware {
    constructor(fn, action) {
        this._fn = fn;
        this._action = action;
    }
    process(state, dispatch, action) {
        if (action.type === this._action) {
            this._fn(state, dispatch, action);
        }
    }
}