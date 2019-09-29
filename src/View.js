export default class View {
    // mapState - функция для выделения нужных полей из всего стейта при передаче во View
    // mapDispatch - в actions функции, уже обернутые в dispatch

    constructor(el, store, mapState, mapDispatch) {
        const actions = Object.entries(mapDispatch).reduce((acc, [key, value]) => {
            acc[key] = (...args) => store.dispatch(value(...args));
            return acc;
        }, {});
        
        this._el = el;
        this.actions = actions;
        this._mapState = mapState;
        this._unsubsribe = store.subscribe(this._updateState.bind(this));
        this._updateState(store.getState());
        return this;
    }
    _updateState(state) {
        this._el.innerHTML = this.render(this._mapState(state));
    }
    render() {
        throw Error('This method should be overridden')
    }
    destroy() {
        this._unsubsribe();
    }
}