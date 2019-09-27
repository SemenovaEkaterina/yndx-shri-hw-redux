export default class View {
    constructor(el, store, mapDispatch) {
        const actions = Object.entries(mapDispatch).reduce((acc, [key, value]) => {
            acc[key] = (...args) => store.dispatch(value(...args));
            return acc;
        }, {});
        
        this.el = el;
        this.actions = actions;
        this._unsubsribe = store.subscribe((state) => this._updateState(state));
        this._updateState(store.getState());
        return this;
    }
    _updateState(state) {
        this.el.innerHTML = this.render(state);
    }
    render() {
        throw Error('This method should be overridden')
    }
    destroy() {
        this._unsubsribe();
    }
}