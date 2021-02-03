import {AuthorizationAction} from "../redux/action";
import {call, put, takeEvery} from "redux-saga/effects";
import axios from "axios";
import {AUTHORIZATION, AUTHORIZATION_SUCCEED} from "../redux/constants";

function* authorizationWorker(action: AuthorizationAction) {
    const token = yield call(axios.post, '/authorization/', action.payload)
    
    if (token.data.token !== '') {
        localStorage.setItem('token', token.data.token)
        yield put({type: AUTHORIZATION_SUCCEED, payload: token.data.token})
    }
}

export function* watchAuthorization() {
    yield takeEvery(AUTHORIZATION, authorizationWorker)
}