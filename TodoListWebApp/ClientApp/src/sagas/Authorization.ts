import {AuthorizationAction} from "../redux/action";
import {call, put, takeEvery} from "redux-saga/effects";
import {AxiosRequestConfig} from "axios";
import {AUTHORIZATION, AUTHORIZATION_SUCCEED} from "../redux/constants";
import httpRequest from "./httpConfig";

function* authorizationWorker(action: AuthorizationAction) {
    const httpConfig: AxiosRequestConfig = {
        method: 'POST',
        url: '/authorization/',
        data: action.payload
    }
    const response = yield call(() => httpRequest(httpConfig));
    if (response.data.token !== '') {
        localStorage.setItem('token', response.data.token)
        yield put({type: AUTHORIZATION_SUCCEED, payload: response.data.token})
    }
}

export function* watchAuthorization() {
    yield takeEvery(AUTHORIZATION, authorizationWorker)
}