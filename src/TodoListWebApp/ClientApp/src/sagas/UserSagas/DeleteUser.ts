import {call, put, takeEvery} from 'redux-saga/effects'
import {AxiosRequestConfig, AxiosResponse} from 'axios';
import httpRequest from "../httpConfig";
import {DELETE_USER, DELETE_USER_SUCCEED} from "../../redux/constants";
import {DeleteUserAction} from "../../redux/action";

function* deleteUserWorker(action: DeleteUserAction) {
    const httpConfig: AxiosRequestConfig = {
        method: 'DELETE',
        url: `/api/user/${action.payload}`,
    }

    const response: AxiosResponse = yield call(() => httpRequest(httpConfig));
    
    if (response.status === 200) {
        yield put({
            type: DELETE_USER_SUCCEED,
            payload: action.payload
        })
    }
}

export function* watchDeleteUser() {
    yield takeEvery(DELETE_USER, deleteUserWorker)
} 