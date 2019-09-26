export default class View {
    _initState(state, actions) {
        this.state = state;
        this.actions = actions;
        this.render();
        this.mount();
    }
    _updateState(state) {
        this.state = state;
        this.render();
    }
    mount() {}
    render() {
        throw Error('This method should be overridden')
    }
}