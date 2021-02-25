import {call, put, takeEvery} from "redux-saga/effects";
import {GET_TODO_LIST, GET_TODO_LIST_SUCCEED} from "../redux/constants";
import {AxiosRequestConfig} from "axios";
import httpRequest from "./httpConfig";

let page = 0

export function* getTodoListWorker() {

    const httpConfig: AxiosRequestConfig = {
        method: 'GET',
        url: `/todoList/${page}`,
    }
    page += 10
    
    const response = yield call(() => httpRequest(httpConfig));
    console.log(response.data)
    yield put({type: GET_TODO_LIST_SUCCEED, payload: response.data})
}

export function* watchGetTodoList() {
    yield takeEvery(GET_TODO_LIST, getTodoListWorker)
}



