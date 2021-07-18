import axios, {AxiosRequestConfig} from "axios";
import {call, select} from "redux-saga/effects";
import {IRootState} from "../redux/configureStore";

export default function* httpRequest(requestConfig: AxiosRequestConfig): any {

    const token: string = yield select((x: IRootState) => x.auth.token);

    if (token !== '') {
        requestConfig.headers = {
            Authorization: `Bearer ${token}`,
        };
    }

    return yield call(axios.create().request, requestConfig);
}

