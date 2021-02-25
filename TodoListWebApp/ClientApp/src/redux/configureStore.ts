import {applyMiddleware, combineReducers, createStore} from "redux";
import todos from "./todos-reducer";
import {Item, Auth, User} from "../Components/Interfaces";
import createSagaMiddleware from 'redux-saga'
import {composeWithDevTools } from 'redux-devtools-extension';
import {rootSaga} from "../sagas/root";
import auth from "./auth-reducer";
import admin from "./admin-reducer";

export interface IRootState {
    auth: Auth,
    todos: Item[],
    admin: User[],
}

export default function configureStore() {
    const sagaMiddleware = createSagaMiddleware()
    const todoApp = combineReducers({todos, auth, admin})
    const store = createStore(todoApp,  composeWithDevTools(applyMiddleware(sagaMiddleware)))
    sagaMiddleware.run(rootSaga)
    
    return store
}