import {all} from 'redux-saga/effects'
import {watchAddTodo} from "./AddTodo";
import {watchEditTodo} from "./EditTodo";
import {watchGetTodoList} from "./GetTodoLIst";
import {watchCompleteTodo} from "./CompleteTodo";
import {watchDeleteTodo} from "./DeleteTodo";
import {watchRegistration} from "./Registration";
import {watchAuthorization} from "./Authorization";

export function* rootSaga () {
    yield all([
        watchAddTodo(), 
        watchEditTodo(),
        watchGetTodoList(),
        watchCompleteTodo(),
        watchDeleteTodo(),
        watchRegistration(),
        watchAuthorization(),
    ]);
}