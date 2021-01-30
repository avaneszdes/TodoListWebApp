import { Authorization} from "../redux/action";
import {call, put, takeEvery} from "redux-saga/effects";
import axios from "axios";
import {AUTHORIZATION, AUTHORIZATION_SUCCEED} from "../redux/constants";

function* authorizationWorker(action: Authorization){
   
    const token = yield call(axios.post, '/authorization/', action.payload)
    
    if(token !== null){
        localStorage.setItem('token', token)
        yield put({type: AUTHORIZATION_SUCCEED, payload: action.payload})
    }
}

export function* watchAuthorization(){
   yield takeEvery(AUTHORIZATION, authorizationWorker)
}