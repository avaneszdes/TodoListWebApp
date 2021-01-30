import { DeleteTodoAction} from "../redux/action";
import {call, put, takeEvery} from 'redux-saga/effects'
import axios from 'axios';
import {DELETE_TODO, DELETE_TODO_SUCCEED} from "../redux/constants";

function* deleteTodoWorker(action: DeleteTodoAction) {

    const res = yield call(axios.delete, `/TodoList/${action.payload}`)
    
    if (res.statusCode === 200) {
        yield put({
            type: DELETE_TODO_SUCCEED,
            payload: action.payload
        })
    }
}

export function* watchDeleteTodo(){
    yield takeEvery(DELETE_TODO, deleteTodoWorker)
} 