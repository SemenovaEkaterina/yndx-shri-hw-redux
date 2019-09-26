export default function (fn, store, mapDispatch) {
    return function () {
        const actions = {};

        Object.keys(mapDispatch).map(key => {
            actions[key] = (...args) => store.dispatch(mapDispatch[key](args));
        });

        const view = new fn();
        store.subscribe((state) => view._updateState(state));
        view._initState(store.getState(), actions);
        return view;
    }
}