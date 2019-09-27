export default class View {
    constructor(el, store, mapState, mapDispatch) {
        const actions = Object.entries(mapDispatch).reduce((acc, [key, value]) => {
            acc[key] = (...args) => store.dispatch(value(...args));
            return acc;
        }, {});
        
        this._el = el;
        this.actions = actions;
        this._unsubsribe = store.subscribe(this._updateState.bind(this), mapState);
        this._updateState(store.getState());
        return this;
    }
    _updateState(state) {
        this._el.innerHTML = this.render(state);
    }
    render() {
        throw Error('This method should be overridden')
    }
    destroy() {
        this._unsubsribe();
    }
}