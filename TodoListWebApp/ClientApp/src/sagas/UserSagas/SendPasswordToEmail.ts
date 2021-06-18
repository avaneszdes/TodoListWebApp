import {SendUserPassword} from "../../redux/action";
import {AxiosError, AxiosRequestConfig} from "axios";
import {call, put, takeEvery} from "redux-saga/effects";
import httpRequest from "../httpConfig";
import {GET_ERROR_MESSAGE_SUCCEED, SEND_USER_PASSWORD} from "../../redux/constants";

function* sendEmailWorker(action: SendUserPassword) {
    
    const httpConfig: AxiosRequestConfig = {
        method: 'POST',
        url: 'Api/User/Api/User/SendEmail',
        data: {
            EmailAddress: action.payload,
        },
    }
    
    try {
        const response = yield call(() => httpRequest(httpConfig));
        if(response.statustCode === 200){
            
        }
    } catch (e) {
    
        const error = e as AxiosError
        yield put({type: GET_ERROR_MESSAGE_SUCCEED, payload: error.response?.data})
    }
}

export function* watchSendEmail() {
    yield takeEvery(SEND_USER_PASSWORD, sendEmailWorker)
}