import {applyMiddleware, combineReducers, createStore} from "redux";
import todos from "./todos-reducer";
import {Item} from "../Components/Interfaces";
import createSagaMiddleware from 'redux-saga'
import {composeWithDevTools } from 'redux-devtools-extension';
import {rootSaga} from "../sagas/root";

export interface IRootState {
    todos: Item[];
}

export default function configureStore() {
    const sagaMiddleware = createSagaMiddleware()
    const todoApp = combineReducers({todos})
    const store = createStore(todoApp,  composeWithDevTools(applyMiddleware(sagaMiddleware)))
    sagaMiddleware.run(rootSaga)
    
    return store
}