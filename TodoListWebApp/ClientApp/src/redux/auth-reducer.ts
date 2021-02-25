import {Auth} from "../Components/Interfaces";
import {TodosActionTypes} from "./action";
import {AUTHORIZATION_SUCCEED, LOG_OUT, REGISTRATION} from "./constants";


const initialState: Auth = {
    token: localStorage.getItem('token')!
}

const auth = (state = initialState, action: TodosActionTypes) => {

    switch (action.type) {
        case REGISTRATION:
            return action.payload

        case AUTHORIZATION_SUCCEED:
            return {token: action.payload}

        case LOG_OUT:
            return {token: action.payload}

        default:
            return state
    }
}

export default auth