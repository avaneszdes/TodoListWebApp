import {call, put, select, takeEvery} from "redux-saga/effects";
import {AxiosRequestConfig, AxiosResponse} from "axios";
import {
    GET_USER_PHOTO, GET_USER_PHOTO_SUCCEED,
} from "../../redux/constants";
import httpRequest from "../httpConfig";
import {IRootState} from "../../redux/configureStore";
import host from '../../Common/Constants'


function* getUserPhotoWorker() {

    const id: number = yield select((x: IRootState) => x.auth.id);

    const httpConfig: AxiosRequestConfig = {
        method: 'GET',
        url: `${host.host}api/user/${id}`,
    }

    const response: AxiosResponse = yield call(() => httpRequest(httpConfig));
    yield put({type: GET_USER_PHOTO_SUCCEED, payload: response.data})

}

export function* watchGetUserPhoto() {
    yield takeEvery(GET_USER_PHOTO, getUserPhotoWorker)
}