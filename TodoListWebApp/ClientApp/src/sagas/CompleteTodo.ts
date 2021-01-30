import {call, put, takeEvery} from 'redux-saga/effects'
import {CompleteTodoSucceedAction} from "../redux/action";
import axios from "axios";
import {COMPLETE_TODO} from "../redux/constants";

function* completeTodoWorker(action : CompleteTodoSucceedAction){
    
    const response = yield call(axios.put, '/TodoList/', {
        id: action.payload.id,
        text: action.payload.text,
        finished: action.payload.finished
    })
    
    if(response.statusCode === 200){
        yield put({type: action.payload, payload: action.payload})
    }
}


export function* watchCompleteTodo(){
    yield takeEvery(COMPLETE_TODO, completeTodoWorker)
}