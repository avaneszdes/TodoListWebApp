import axios from "axios";
import {Registration} from "../redux/action";
import {call, put, takeEvery} from "redux-saga/effects";
import {REGISTRATION, REGISTRATION_SUCCEED} from "../redux/constants";


function* registrationWorker(action: Registration) {

    const response = yield call(axios.post, '/registration/', action.payload)
    if (response.statusCode === 200) {
        yield put({type: REGISTRATION_SUCCEED, payload: action.payload})
    }
}

export function* watchRegistration(){
    yield takeEvery(REGISTRATION, registrationWorker)
} 