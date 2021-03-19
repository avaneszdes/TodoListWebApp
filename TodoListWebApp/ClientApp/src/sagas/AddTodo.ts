import {AddTodoAction, createTodoSucceed} from "../redux/action";
import {call, put, takeEvery} from 'redux-saga/effects'
import {AxiosRequestConfig} from 'axios';
import {ADD_TODO} from "../redux/constants";
import httpRequest from "./httpConfig";

function* addTodoWorker(action: AddTodoAction) {

    const httpConfig: AxiosRequestConfig = {
        method: 'POST',
        url: '/api/todoList',
        data: {
            text: action.payload,
            finished: false
        }
    }

    const response = yield call(() => httpRequest(httpConfig));
    const addTodoSucceedAction = createTodoSucceed(response.data, action.payload, false);
    yield put(addTodoSucceedAction)
}

export function* watchAddTodo() {
    yield takeEvery(ADD_TODO, addTodoWorker)
} 