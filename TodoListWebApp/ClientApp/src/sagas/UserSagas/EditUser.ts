import {call, put, takeEvery} from "redux-saga/effects";
import {AxiosRequestConfig} from "axios";
import {EDIT_USER} from '../../redux/constants';
import httpRequest from "../httpConfig";
import {EditUserSucceedAction} from "../../redux/action";

function* editUserWorker(action: EditUserSucceedAction){
   
    const httpConfig: AxiosRequestConfig = {
        method: 'PUT',
        url: '/api/user',
        data: {
            id: action.payload.id,
            firstName: action.payload.firstName,
            lastName: action.payload.lastName,
            email: action.payload.email,
            role: action.payload.role,
            photo: action.payload.photo,
        }
    }

    const response = yield call(() => httpRequest(httpConfig));
    if(response.statusCode === 200){
        yield put({type: action.type, payload: action.payload})
    }
}


export function* watchEditUser(){
    yield takeEvery(EDIT_USER, editUserWorker)
}