import {AddColumnAction} from "../../redux/action";
import {call, put, takeEvery} from 'redux-saga/effects'
import {AxiosRequestConfig, AxiosResponse} from 'axios';
import {CREATE_TODO_COLUMN, CREATE_TODO_COLUMN_SUCCEED} from '../../redux/constants';
import httpRequest from "../httpConfig";
import host from '../../Common/Constants'

function* addCreateColumnWorker(action: AddColumnAction) {

    const httpConfig: AxiosRequestConfig = {
        method: 'POST',
        url: `${host.host}api/column`,
        data: {columnName: action.payload}
    }

    const response: AxiosResponse = yield call(() => httpRequest(httpConfig));
    if (response.status === 200) {
        yield put(
            {
                type: CREATE_TODO_COLUMN_SUCCEED,
                payload: { columnName: action.payload, id: response.data, todoItems: [] }
            })
    }
}

export function* watchCreateColumn() {
    yield takeEvery(CREATE_TODO_COLUMN, addCreateColumnWorker)
} 