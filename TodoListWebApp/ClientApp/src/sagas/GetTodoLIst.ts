import {InitializeTodoListSucceedAction} from "../redux/action";
import axios from "axios";
import {call, put, takeEvery} from "redux-saga/effects";
import {GET_TODO_LIST, GET_TODO_LIST_SUCCEED} from "../redux/constants";

export  function* getTodoListWorker(action : InitializeTodoListSucceedAction){
    
    const res = yield call(axios.get, '/TodoList/')
    yield put({type: GET_TODO_LIST_SUCCEED, payload: res.data})
}

export function* watchGetTodoList(){
    yield takeEvery(GET_TODO_LIST, getTodoListWorker)
}