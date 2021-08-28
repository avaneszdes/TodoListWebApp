import {ChangeUserPasswordSucceed} from "../../redux/action";
import {AxiosError, AxiosRequestConfig, AxiosResponse} from "axios";
import {call, put, takeEvery} from "redux-saga/effects";
import httpRequest from "../httpConfig";
import {CHANGE_USER_PASSWORD, GET_ERROR_MESSAGE_SUCCEED} from "../../redux/constants";
import history from "../../components/history";
import host from '../../Common/Constants'

function* changeEmailWorker(action: ChangeUserPasswordSucceed) {
    
    const httpConfig: AxiosRequestConfig = {
        method: 'POST',
        url: `${host.host}api/user`,
        data: action.payload,
    }
    
    try {
        const response: AxiosResponse = yield call(() => httpRequest(httpConfig));
        if(response.status === 200){
            history.push("/");
           console.log(123)
        }
    } catch (e) {

        const error = e as AxiosError
        yield put({type: GET_ERROR_MESSAGE_SUCCEED, payload: error.response?.data})
    }
}

export function* watchChangeEmail() {
    yield takeEvery(CHANGE_USER_PASSWORD, changeEmailWorker)
}