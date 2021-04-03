import {SendUserPassword} from "../redux/action";
import {AxiosRequestConfig} from "axios";
import {call,takeEvery} from "redux-saga/effects";
import httpRequest from "./httpConfig";
import {SEND_USER_PASSWORD} from "../redux/constants";

function* sendEmailWorker(action: SendUserPassword) {
    const httpConfig: AxiosRequestConfig = {
        
        method: 'POST',
        url: '/api/user',
        data : action.payload,
        
    }
    
    const response = yield call(() => httpRequest(httpConfig));
    if (response.statusCode === 200) {
       
    }
}

export function* watchSendEmail() {
    yield takeEvery(SEND_USER_PASSWORD, sendEmailWorker)
}