import axios, {AxiosRequestConfig} from "axios";
import {call, select} from "redux-saga/effects";
import {IRootState} from "../redux/configureStore";

export default function* httpRequest(requestConfig: AxiosRequestConfig) {

    const token = yield select((x: IRootState) => x.auth.token);
    if (token !== '') {

        requestConfig.headers = {
            Authorization: `Bearer ${token}`,
            "Cross-Origin-Embedder-Policy": "require - corp",
            "Cross-Origin-Opener-Policy": "same - origin",
        };
    }

    return yield call(axios.create().request, requestConfig);
}

