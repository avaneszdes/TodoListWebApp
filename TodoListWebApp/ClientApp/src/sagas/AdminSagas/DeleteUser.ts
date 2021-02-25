import {call, put, takeEvery} from 'redux-saga/effects'
import {AxiosRequestConfig} from 'axios';
import httpRequest from "../httpConfig";
import {DELETE_USER, DELETE_USER_SUCCEED} from "../../redux/constants";
import {DeleteUserAction} from "../../redux/action";

function* deleteUserWorker(action: DeleteUserAction) {
    const httpConfig: AxiosRequestConfig = {
        method: 'DELETE',
        url: `/Admin/${action.payload}`,
    }

    const response = yield call(() => httpRequest(httpConfig));

    if (response.statusCode === 200) {
        yield put({
            type: DELETE_USER_SUCCEED,
            payload: action.payload
        })
    }
}

export function* watchDeleteUser() {
    yield takeEvery(DELETE_USER, deleteUserWorker)
} 