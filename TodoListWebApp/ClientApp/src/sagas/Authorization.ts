import {AuthorizationAction} from "../redux/action";
import {call, put, takeEvery} from "redux-saga/effects";
import {AxiosRequestConfig} from "axios";
import {AUTHORIZATION, AUTHORIZATION_SUCCEED} from "../redux/constants";
import httpRequest from "./httpConfig";
import jwt_decode from "jwt-decode";
import {CustomJwtPayload} from "../redux/auth-reducer";
import history from '../Components/history'
function* authorizationWorker(action: AuthorizationAction) {
    
    
    const httpConfig: AxiosRequestConfig = {
        method: 'POST',
        url: '/authorization/',
        data: action.payload
    }
    const response = yield call(() => httpRequest(httpConfig));
    if (Boolean(response.data)) {
        const jwt = Object.values(jwt_decode<CustomJwtPayload>(response.data))
        const profile = JSON.parse(jwt[1])
        localStorage.setItem('token', response.data)
        
        yield put({
            type: AUTHORIZATION_SUCCEED, payload: {
                token: response.data,
                role: profile.Role,
                name: profile.FirstName,
            }
        })
        if(profile.Role === "user"){
            history.push("/todoList");
        }
        else if(profile.Role === "admin"){
            history.push("/admin");
        } 
        
        // eslint-disable-next-line no-restricted-globals
        location.reload();
        
    }
}

export function* watchAuthorization() {
    yield takeEvery(AUTHORIZATION, authorizationWorker)
}