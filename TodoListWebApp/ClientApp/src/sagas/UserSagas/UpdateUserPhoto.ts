import {EditUserPhotoSucceed} from "../../redux/action";
import {AxiosRequestConfig} from "axios";
import {call, put, takeEvery} from "redux-saga/effects";
import httpRequest from "../httpConfig";
import {EDIT_USER_PHOTO, EDIT_USER_PHOTO_SUCCEED} from "../../redux/constants";

function* updateUserPhotoWorker(action: EditUserPhotoSucceed){
    const httpConfig: AxiosRequestConfig = {
        method: 'PUT',
        url: '/api/user',
        data: action.payload
    }

    const response = yield call(() => httpRequest(httpConfig));
    if(response.statusCode === 200){
        yield put({type: EDIT_USER_PHOTO_SUCCEED, payload: action.payload})
    }
}

export function* watchUpdateUserPhoto(){
    yield takeEvery(EDIT_USER_PHOTO, updateUserPhotoWorker)
}