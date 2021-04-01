import {AuthorizationAction} from "../redux/action";
import {call, put, takeEvery} from "redux-saga/effects";
import {AxiosRequestConfig} from "axios";
import {
    AUTHORIZATION,
    AUTHORIZATION_SUCCEED,
    GET_USER_PHOTO,
    GET_USER_PHOTO_SUCCEED,
    LOADING
} from "../redux/constants";
import httpRequest from "./httpConfig";
import jwt_decode from "jwt-decode";
import {CustomJwtPayload} from "../redux/auth-reducer";
import history from '../Components/history'



function* authorizationWorker(action: AuthorizationAction) {

    yield put({type: LOADING, payload: true})
    const httpConfig: AxiosRequestConfig = {
        method: 'POST',
        url: 'authorization',
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
                photo: '',
                id: profile.Id
            }
        })
        
        if(profile.Role === "user"){
            history.push("/todoList");
        }
        else if(profile.Role === "admin"){
            history.push("/admin");
        }
        yield put({type: LOADING, payload: false})
       
        
    }
}

export function* watchAuthorization() {
    yield takeEvery(AUTHORIZATION, authorizationWorker)
}