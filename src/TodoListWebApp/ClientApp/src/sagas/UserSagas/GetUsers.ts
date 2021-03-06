
import {call, put, takeEvery} from "redux-saga/effects";
import {AxiosRequestConfig, AxiosResponse} from "axios";
import httpRequest from "../httpConfig";
import {GET_USERS, GET_USERS_SUCCEED} from "../../redux/constants";

export function* getUsersWorker(){

    const httpConfig : AxiosRequestConfig = {
        method: 'GET',
        url: '/api/user/',
    }

    const response: AxiosResponse = yield call(() => httpRequest(httpConfig))
    yield put({type: GET_USERS_SUCCEED, payload: response.data})
}

export function* watchGetUsersList(){
    yield takeEvery(GET_USERS, getUsersWorker)
}