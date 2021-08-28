import {AddTodoAction, createTodoSucceed} from "../../redux/action";
import {call, put, takeEvery} from 'redux-saga/effects'
import {AxiosRequestConfig, AxiosResponse} from 'axios';
import {ADD_TODO} from "../../redux/constants";
import httpRequest from "../httpConfig";
import host from '../../Common/Constants'


function* addTodoWorker(action: AddTodoAction) {

    const httpConfig: AxiosRequestConfig = {
        method: 'POST',
        url: `${host.host}api/todoList`,
        data: {
            text: action.payload,
            finished: false,
            columnId: 1
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