import {call, put, select, takeEvery} from "redux-saga/effects";
import {AxiosRequestConfig} from "axios";
import {
    GET_USER_PHOTO, GET_USER_PHOTO_SUCCEED,
} from "../redux/constants";
import httpRequest from "./httpConfig";
import {IRootState} from "../redux/configureStore";


function* getUserPhotoWorker() {

    const id: number = yield select((x: IRootState) => x.auth.id);
    
    const httpConfig: AxiosRequestConfig = {
        method: 'GET',
        url: `api/user/${id}`,
    }

    const response = yield call(() => httpRequest(httpConfig));
    yield put({type: GET_USER_PHOTO_SUCCEED, payload: response.data})

}

export function* watchGetUserPhoto() {
    yield takeEvery(GET_USER_PHOTO, getUserPhotoWorker)
}