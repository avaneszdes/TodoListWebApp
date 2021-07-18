import {
    CHANGE_USER_PASSWORD_SUCCEED,
    DELETE_USER,
    EDIT_USER,
    GET_USERS_SUCCEED
} from "./constants";
import {User} from "../Components/Interfaces";
import {TodosActionTypes} from "./action";

const initialState: User[] = []

export default (state = initialState, action: TodosActionTypes) => {

    switch (action.type) {

        case GET_USERS_SUCCEED:
            return action.payload

        case DELETE_USER:
            return state.filter(x => x.id !== action.payload)

        case EDIT_USER:
            return state.map(x => {
                if (x.id === action.payload.id) {
                    return action.payload
                }
                return x;
            })
        case CHANGE_USER_PASSWORD_SUCCEED:
            return state

        default:
            return state
    }
}