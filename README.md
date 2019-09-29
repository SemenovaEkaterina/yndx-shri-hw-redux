# Домашнее задание «Архитектура»

Реализованы:

1. Класс Store
1. Класс View
1. combineReducers
1. mapState, mapDispatch
1. applyMiddleware


### Пример использования

#### Создание стора

`new Store(reducer, middlewares);`

`reducer` - чистый редьюсер или результат `combineReducers`

#### `combineReducers`

`combineReducers({files: filesReducer})`

#### Создание view

`new Files(el, store, mapState, mapDispatch);`

#### mapState

`(state) => ({ files: state.files })`

#### mapDispatch

`{fetchList: actions.fetchList}`

#### Middleware

```
    const middleware = (store) => (dispatch) => (action) => {
        ...
        return dispatch(action);
    };
```