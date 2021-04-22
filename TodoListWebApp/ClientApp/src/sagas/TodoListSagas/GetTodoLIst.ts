import {call, put, takeEvery} from "redux-saga/effects";
import {GET_TODO_LIST, GET_TODO_LIST_SUCCEED, LOADING} from "../../redux/constants";
import {AxiosRequestConfig} from "axios";
import httpRequest from "../httpConfig";

let page = 0

export function* getTodoListWorker() {
    yield put({type: LOADING, payload: true})
    const httpConfig: AxiosRequestConfig = {
        method: 'GET',
        url: `/api/todoList/${page}`,
    }

    page += 10
    const response = yield call(() => httpRequest(httpConfig));
    yield put({type: GET_TODO_LIST_SUCCEED, payload: response.data})
    yield put({type: LOADING, payload: false})
}

export function* watchGetTodoList() {
    yield takeEvery(GET_TODO_LIST, getTodoListWorker)
}

