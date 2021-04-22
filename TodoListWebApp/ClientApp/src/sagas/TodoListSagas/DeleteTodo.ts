import {DeleteTodoAction} from "../../redux/action";
import {call, put, takeEvery} from 'redux-saga/effects'
import {AxiosRequestConfig} from 'axios';
import {DELETE_TODO, DELETE_TODO_SUCCEED} from "../../redux/constants";
import httpRequest from "../httpConfig";

function* deleteTodoWorker(action: DeleteTodoAction) {

    const httpConfig: AxiosRequestConfig = {
        method: 'DELETE',
        url: `/api/todoList/${action.payload}`,
    }

    const response = yield call(() => httpRequest(httpConfig));
    if (response.statusCode === 200) {
        yield put({
            type: DELETE_TODO_SUCCEED,
            payload: action.payload
        })
    }
}

export function* watchDeleteTodo() {
    yield takeEvery(DELETE_TODO, deleteTodoWorker)
} 