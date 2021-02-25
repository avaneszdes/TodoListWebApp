import {EditTodoSucceedAction} from "../redux/action";
import {call, put, takeEvery} from "redux-saga/effects";
import {AxiosRequestConfig} from "axios";
import {EDIT_TODO} from "../redux/constants";
import httpRequest from "./httpConfig";


function* editTodoWorker(action: EditTodoSucceedAction){
    const httpConfig: AxiosRequestConfig = {
        method: 'PUT',
        url: '/TodoList',
        data: {
            id: action.payload.id,
            text: action.payload.text,
            finished: action.payload.finished
        }
    }

    const response = yield call(() => httpRequest(httpConfig));
    
    if(response.statusCode === 200){
        yield put({type: action.payload, payload: action.payload})
    }
}


export function* watchEditTodo(){
    yield takeEvery(EDIT_TODO, editTodoWorker)
}