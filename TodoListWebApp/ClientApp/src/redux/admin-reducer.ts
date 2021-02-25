import {DELETE_USER, EDIT_USER, GET_USERS_SUCCEED} from "./constants";
import {User} from "../Components/Interfaces";
import {TodosActionTypes} from "./action";

const initialState: User[] = []

const admin = (state = initialState, action: TodosActionTypes) => {

    switch (action.type) {
        
        case GET_USERS_SUCCEED:
            return  action.payload

        case DELETE_USER:
            return state.filter(x => x.id !== action.payload)
        
        case EDIT_USER:
            return  state.map(x => {
                if (x.id === action.payload.id) {
                    return {...x, user: action.payload}
                }
                return x;
            })
        
        default:
            return state
    }
}
export default admin