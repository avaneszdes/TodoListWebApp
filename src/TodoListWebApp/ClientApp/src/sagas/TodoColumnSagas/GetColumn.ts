import {call, put, takeEvery} from 'redux-saga/effects'
import {AxiosRequestConfig, AxiosResponse} from 'axios';
import {GET_TODO_COLUMN, GET_TODO_COLUMN_SUCCEED} from '../../redux/constants';
import httpRequest from "../httpConfig";
import host from '../../Common/Constants'

function* getColumnWorker() {

    const httpConfig: AxiosRequestConfig = {
        method: 'GET',
        url: `${host.host}api/column`,
    }

    let response: AxiosResponse = yield call(() => httpRequest(httpConfig));

    for (let i = 0; i < response.data; i++) {

        httpConfig.url = `${host.host}api/column/${i + 1}`
        response = yield call(() => httpRequest(httpConfig));

        if (response.status === 200) {
            yield put(
                {
                    type: GET_TODO_COLUMN_SUCCEED,
                    payload: {
                        id: response.data.id,
                        name: response.data.columnName,
                        todoItems: response.data.todoItems
                    }
                })
            
            
        }

    }


}

export function* watchGetColumn() {
    yield takeEvery(GET_TODO_COLUMN, getColumnWorker)
} 