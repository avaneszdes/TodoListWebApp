import {AxiosError, AxiosRequestConfig} from "axios";
import {RegistrationAction} from "../redux/action";
import {call, put, takeEvery} from "redux-saga/effects";
import {GET_ERROR_MESSAGE_SUCCEED, REGISTRATION, REGISTRATION_SUCCEED} from "../redux/constants";
import httpRequest from "./httpConfig";
import history from "../components/history";


function* registrationWorker(action: RegistrationAction) {
    const httpConfig: AxiosRequestConfig = {
        method: 'POST',
        url: 'api/registration/',
        data: action.payload
    }
    try {
        const response = yield call(() => httpRequest(httpConfig));
            yield put({type: REGISTRATION_SUCCEED, payload: action.payload})
            history.push("/signIn");
    }
    catch (e){
        const error = e as AxiosError
        yield put({type: GET_ERROR_MESSAGE_SUCCEED, payload: error.response?.data.errorText})
    }
}

export function* watchRegistration(){
    yield takeEvery(REGISTRATION, registrationWorker)
} 