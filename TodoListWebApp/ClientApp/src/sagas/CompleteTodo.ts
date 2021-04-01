import {call, put, takeEvery} from 'redux-saga/effects'
import {CompleteTodoSucceedAction} from "../redux/action";
import {AxiosRequestConfig} from "axios";
import {COMPLETE_TODO} from "../redux/constants";
import httpRequest from "./httpConfig";

function* completeTodoWorker(action: CompleteTodoSucceedAction) {

    const httpConfig: AxiosRequestConfig = {
        method: 'PUT',
        url: '/api/todoList',
        data: {
            id: action.payload.id,
            text: action.payload.text,
            isComplete: action.payload.isComplete
        }
    }
    
    const response = yield call(() => httpRequest(httpConfig));
    if (response.statusCode === 200) {
        yield put({type: action.payload, payload: action.payload})
    }
}

export function* watchCompleteTodo() {
    yield takeEvery(COMPLETE_TODO, completeTodoWorker)
}