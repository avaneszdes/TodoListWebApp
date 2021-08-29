import {AxiosError, AxiosRequestConfig, AxiosResponse} from "axios";
import {RegistrationAction} from "../redux/action";
import {call, put, takeEvery} from "redux-saga/effects";
import {GET_ERROR_MESSAGE_SUCCEED, REGISTRATION, REGISTRATION_SUCCEED} from "../redux/constants";
import httpRequest from "./httpConfig";
import history from "../components/history";
import host from '../Common/Constants'

function* registrationWorker(action: RegistrationAction) {
    const httpConfig: AxiosRequestConfig = {
        method: 'POST',
        url: `${host.host}api/registration/`,
        data: action.payload
    }
    try {
        const response: AxiosResponse = yield call(() => httpRequest(httpConfig));
        if (response.status === 200) {
            yield put({type: REGISTRATION_SUCCEED, payload: action.payload})
            history.push("/");
        }


    } catch (e) {
        const error = e as AxiosError
        yield put({type: GET_ERROR_MESSAGE_SUCCEED, payload: error.response?.data})
    }
}

export function* watchRegistration() {
    yield takeEvery(REGISTRATION, registrationWorker)
} 