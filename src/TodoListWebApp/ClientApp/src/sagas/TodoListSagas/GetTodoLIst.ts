import {call, put, takeEvery} from "redux-saga/effects";
import {GET_TODO_LIST, GET_TODO_LIST_SUCCEED, LOADING} from "../../redux/constants";
import {AxiosRequestConfig, AxiosResponse} from "axios";
import httpRequest from "../httpConfig";
import {Item} from "../../components/Interfaces";
import host from '../../Common/Constants'

let page = 0

export function* getTodoListWorker() {
    yield put({type: LOADING, payload: true})
    const httpConfig: AxiosRequestConfig = {
        method: 'GET',
        url: `${host.host}api/todoList/${page}`,
    }

    page += 10
    const response: AxiosResponse = yield call(() => httpRequest(httpConfig));
    response.data.map((x: Item) => x.createdDate = new Date(x.createdDate).toLocaleDateString() + ' ' + new Date(x.createdDate).toLocaleTimeString())
    yield put({type: GET_TODO_LIST_SUCCEED, payload: response.data})
    yield put({type: LOADING, payload: false})
}

export function* watchGetTodoList() {
    yield takeEvery(GET_TODO_LIST, getTodoListWorker)
}

