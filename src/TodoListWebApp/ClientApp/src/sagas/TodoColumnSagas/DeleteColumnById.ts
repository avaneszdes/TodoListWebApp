import {call, put, takeEvery} from 'redux-saga/effects'
import {AxiosRequestConfig, AxiosResponse} from 'axios';
import {
    DELETE_COLUMN_BY_ID,
    DELETE_COLUMN_BY_ID_SUCCEED
} from '../../redux/constants';
import httpRequest from "../httpConfig";
import host from '../../Common/Constants'
import {DeleteColumnById} from "../../redux/action";

function* deleteColumnWorker(action: DeleteColumnById) {

    const httpConfig: AxiosRequestConfig = {
        method: 'DELETE',
        url: `${host.host}api/column/${action.payload}`,
    }

    const response: AxiosResponse = yield call(() => httpRequest(httpConfig));
    if (response.status === 200) {
        yield put(
            {
                type: DELETE_COLUMN_BY_ID_SUCCEED,
                payload: action.payload
            })
    }
}

export function* watchDeleteColumn() {
    yield takeEvery(DELETE_COLUMN_BY_ID, deleteColumnWorker)
}