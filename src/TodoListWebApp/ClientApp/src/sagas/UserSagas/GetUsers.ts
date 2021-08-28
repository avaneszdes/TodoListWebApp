import {call, put, takeEvery} from "redux-saga/effects";
import {AxiosRequestConfig, AxiosResponse} from "axios";
import httpRequest from "../httpConfig";
import {GET_USERS, GET_USERS_SUCCEED} from "../../redux/constants";
import host from '../../Common/Constants'

export function* getUsersWorker(){

    const httpConfig : AxiosRequestConfig = {
        method: 'GET',
        url: `${host.host}api/user/`,
    }

    const response: AxiosResponse = yield call(() => httpRequest(httpConfig))
    yield put({type: GET_USERS_SUCCEED, payload: response.data})
}

export function* watchGetUsersList(){
    yield takeEvery(GET_USERS, getUsersWorker)
}