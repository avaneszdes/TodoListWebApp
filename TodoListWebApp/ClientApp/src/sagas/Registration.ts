import  {AxiosRequestConfig} from "axios";
import {RegistrationAction} from "../redux/action";
import {call, put, takeEvery} from "redux-saga/effects";
import {REGISTRATION, REGISTRATION_SUCCEED} from "../redux/constants";
import httpRequest from "./httpConfig";
import history from "../components/history";


function* registrationWorker(action: RegistrationAction) {
    const httpConfig: AxiosRequestConfig = {
        method: 'POST',
        url: 'api/registration/',
        data: action.payload
    }
    const response = yield call(() => httpRequest(httpConfig));
    if (response.statusCode === 200) {
        yield put({type: REGISTRATION_SUCCEED, payload: action.payload})
        history.push("/signIn");
    }
}

export function* watchRegistration(){
    yield takeEvery(REGISTRATION, registrationWorker)
} 