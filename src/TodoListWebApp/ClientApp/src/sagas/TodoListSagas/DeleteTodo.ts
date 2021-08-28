import {DeleteTodoAction} from "../../redux/action";
import {call, put, takeEvery} from 'redux-saga/effects'
import {AxiosRequestConfig, AxiosResponse} from 'axios';
import {DELETE_TODO, DELETE_TODO_SUCCEED} from "../../redux/constants";
import httpRequest from "../httpConfig";
import host from '../../Common/Constants'

function* deleteTodoWorker(action: DeleteTodoAction) {

    const httpConfig: AxiosRequestConfig = {
        method: 'DELETE',
        url: `${host.host}api/todoList/${action.payload}`,
    }

    const response: AxiosResponse = yield call(() => httpRequest(httpConfig));
    if (response.status === 200) {
        yield put({
            type: DELETE_TODO_SUCCEED,
            payload: action.payload
        })
    }
}

export function* watchDeleteTodo() {
    yield takeEvery(DELETE_TODO, deleteTodoWorker)
} 