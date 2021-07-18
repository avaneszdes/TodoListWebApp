import {AddTodoAction, createTodoSucceed} from "../../redux/action";
import {call, put, takeEvery} from 'redux-saga/effects'
import {AxiosRequestConfig, AxiosResponse} from 'axios';
import {ADD_TODO} from "../../redux/constants";
import httpRequest from "../httpConfig";

function* addTodoWorker(action: AddTodoAction) {

    const httpConfig: AxiosRequestConfig = {
        method: 'POST',
        url: '/api/todoList',
        data: {
            text: action.payload,
            finished: false,
        }
    }

    const response : AxiosResponse = yield call(() => httpRequest(httpConfig));
    const createdDate =  new Date(response.data.createdDate).toLocaleDateString() + ' ' + new Date(response.data.createdDate).toLocaleTimeString()
    const addTodoSucceedAction = createTodoSucceed(response.data.id, action.payload, false,createdDate);
    yield put(addTodoSucceedAction)
}

export function* watchAddTodo() {
    yield takeEvery(ADD_TODO, addTodoWorker)
} 