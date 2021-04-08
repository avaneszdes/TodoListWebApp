import {CLEAR_ERROR_MESSAGE, GET_ERROR_MESSAGE_SUCCEED} from "./constants";
import {TodosActionTypes} from "./action";



const initialState: string = ''

const error = (state = initialState, action: TodosActionTypes) => {

    switch (action.type) {

        case GET_ERROR_MESSAGE_SUCCEED:
            return action.payload


        case CLEAR_ERROR_MESSAGE:
            return action.payload

        default:
            return state
    }
}
export default error