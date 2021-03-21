import {all} from 'redux-saga/effects'
import {watchAddTodo} from "./AddTodo";
import {watchEditTodo} from "./EditTodo";
import {watchGetTodoList} from "./GetTodoLIst";
import {watchCompleteTodo} from "./CompleteTodo";
import {watchDeleteTodo} from "./DeleteTodo";
import {watchRegistration} from "./Registration";
import {watchAuthorization} from "./Authorization";
import {watchGetUsersList} from "./AdminSagas/GetUsers";
import {watchDeleteUser} from "./AdminSagas/DeleteUser";
import {watchEditUser} from "./AdminSagas/EditUser";
import {watchUpdateUserPhoto} from "./UpdateUserPhoto";

export function* rootSaga () {
    yield all([
        watchAddTodo(), 
        watchEditTodo(),
        watchGetTodoList(),
        watchCompleteTodo(),
        watchDeleteTodo(),
        watchRegistration(),
        watchAuthorization(),
        watchGetUsersList(),
        watchDeleteUser(),
        watchEditUser(),
        watchUpdateUserPhoto(),
    ]);
}