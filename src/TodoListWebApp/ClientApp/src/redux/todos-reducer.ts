import {
    ADD_TODO_SUCCEED,
    COMPLETE_TODO,
    DELETE_TODO,
    EDIT_TODO,
    GET_TODO_LIST_SUCCEED, LOADING,
} from './constants'
import {ITodosState} from "../Components/Interfaces";
import {TodosActionTypes} from "./action";

const initialState: ITodosState = {
    items: [],
    loading: false
}

export default (state = initialState, action: TodosActionTypes) => {
    switch (action.type) {
        case DELETE_TODO:
            return {...state, items: state.items.filter(todo => todo.id !== action.payload)}

        case ADD_TODO_SUCCEED:
            return {...state, items: [...state.items, action.payload]}

        case COMPLETE_TODO: {
            return {
                ...state, items: state.items.map(x => {
                    if (x.id === action.payload.id) {
                        return {...x, isComplete: action.payload.isComplete}
                    }
                    return x;
                })
            };
        }

        case EDIT_TODO:
            return {
                ...state, items: state.items.map(x => {
                    if (x.id === action.payload.id) {
                        return {...x, text: action.payload.text}
                    }
                    return x;
                })
            }

        case GET_TODO_LIST_SUCCEED: {
            return {...state, items: [...state.items, ...action.payload]}
        }

        case LOADING:
            return {...state, loading: action.payload}


        default:
            return state
    }
}
