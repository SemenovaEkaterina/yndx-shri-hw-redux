export default class Middleware {
    // Сохранение типа события, которая приводит к вызову обрабочика
    constructor(fn, actionType) {
        this._fn = fn;
        this._actionType = actionType;
    }

    // Вызов обработчика при возникновении события нужного типа
    process(state, dispatch, action) {
        if (action.type === this._actionType) {
            this._fn(state, dispatch, action);
        }
    }
}