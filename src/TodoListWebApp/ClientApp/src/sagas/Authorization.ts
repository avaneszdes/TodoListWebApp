import {AuthorizationAction} from "../redux/action";
import {call, put, takeEvery} from "redux-saga/effects";
import {AxiosError, AxiosRequestConfig, AxiosResponse} from "axios";
import {
    AUTHORIZATION,
    AUTHORIZATION_SUCCEED, GET_ERROR_MESSAGE_SUCCEED,
    LOADING
} from "../redux/constants";
import httpRequest from "./httpConfig";
import jwt_decode from "jwt-decode";
import {CustomJwtPayload} from "../redux/auth-reducer";
import history from '../components/history'
import host from '../Common/Constants'

function* authorizationWorker(action: AuthorizationAction) {

    yield put({type: LOADING, payload: true})
    const httpConfig: AxiosRequestConfig = {
        method: 'POST',
        url: `${host.host}authorization`,
        data: action.payload
    }

    try {
        const response:AxiosResponse = yield call(() => httpRequest(httpConfig));
        const jwt = Object.values(jwt_decode<CustomJwtPayload>(response.data))

        const profile = JSON.parse(jwt[1])
        localStorage.setItem('token', response.data)

        yield put({
            type: AUTHORIZATION_SUCCEED, payload: {
                token: response.data,
                role: profile.Role,
                name: profile.FirstName,
                photo: '',
                id: profile.Id
            }
        })

        if (profile.Role === "user") {
            history.push("/todoList");
        } else if (profile.Role === "admin") {
            history.push("/admin");
        }

    } catch (e) {

        const error = e as AxiosError
        yield put({type: GET_ERROR_MESSAGE_SUCCEED, payload: error.response?.data.errorText})
    }

    yield put({type: LOADING, payload: false})
}

export function* watchAuthorization() {
    yield takeEvery(AUTHORIZATION, authorizationWorker)
}