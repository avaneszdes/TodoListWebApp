import {EditUserPhotoSucceed} from "../../redux/action";
import {AxiosRequestConfig, AxiosResponse} from "axios";
import {call, put, takeEvery} from "redux-saga/effects";
import httpRequest from "../httpConfig";
import {EDIT_USER_PHOTO, EDIT_USER_PHOTO_SUCCEED} from "../../redux/constants";
import host from '../../Common/Constants'

function* updateUserPhotoWorker(action: EditUserPhotoSucceed){
    const httpConfig: AxiosRequestConfig = {
        method: 'PUT',
        url: `${host.host}api/user`,
        data: action.payload
    }

    const response: AxiosResponse = yield call(() => httpRequest(httpConfig));
    if(response.status === 200){
        yield put({type: EDIT_USER_PHOTO_SUCCEED, payload: action.payload})
    }
}

export function* watchUpdateUserPhoto(){
    yield takeEvery(EDIT_USER_PHOTO, updateUserPhotoWorker)
}