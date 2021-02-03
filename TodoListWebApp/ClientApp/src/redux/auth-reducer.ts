import {Auth, SignForm} from "../Components/Interfaces";
import {TodosActionTypes} from "./action";
import { AUTHORIZATION_SUCCEED, REGISTRATION} from "./constants";


const initialState: Auth | SignForm = {
    token: '',
}

const auth = (state = initialState, action: TodosActionTypes) => {

    switch (action.type) {
        case REGISTRATION:
            return action.payload

        case AUTHORIZATION_SUCCEED:
            return action.payload

        default:
            return state
    }
}

export default auth