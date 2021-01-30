import {AddTodoAction, createTodoSucceed} from "../redux/action";
import {call, put, takeEvery} from 'redux-saga/effects'
import axios from 'axios';
import {ADD_TODO} from "../redux/constants";

function* addTodoWorker(action: AddTodoAction) {

    const data = yield call(axios.post, '/TodoList', {
        text: action.payload,
        finished: false
    });
    const addTodoSucceedAction = createTodoSucceed(data.data, action.payload, false);
    yield put(addTodoSucceedAction)

}

export function* watchAddTodo() {
    yield takeEvery(ADD_TODO, addTodoWorker)
} 