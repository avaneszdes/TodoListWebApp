import {EditTodoSucceedAction} from "../redux/action";
import {call, put, takeEvery} from "redux-saga/effects";
import axios from "axios";
import {EDIT_TODO} from "../redux/constants";


function* editTodoWorker(action: EditTodoSucceedAction){
    
    const response = yield call(axios.put, '/TodoList/', {
        id: action.payload.id,
        text: action.payload.text,
        finished: action.payload.finished
    })
    
    if(response.statusCode === 200){
        yield put({type: action.payload, payload: action.payload})
    }
}


export function* watchEditTodo(){
    yield takeEvery(EDIT_TODO, editTodoWorker)
}