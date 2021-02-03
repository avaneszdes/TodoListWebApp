import {call,select, put, takeEvery} from "redux-saga/effects";
import {GET_TODO_LIST, GET_TODO_LIST_SUCCEED} from "../redux/constants";
import {IRootState} from "../redux/configureStore";
import axios from "axios";

export function* getTodoListWorker() {

    const securityTokens = yield select((state: IRootState) => state.auth.token);

    const res = yield call(axios.get, '/TodoList/',{
        headers : {
            Authorization: `Bearer ${securityTokens.accessToken}`,
        }
    })
       
    console.log(res.data)
    yield put({type: GET_TODO_LIST_SUCCEED, payload: res.data})
}

export function* watchGetTodoList() {
    yield takeEvery(GET_TODO_LIST, getTodoListWorker)
}



