import {
    ADD_TODO_SUCCEED,
    COMPLETE_TODO,
    CREATE_TODO_COLUMN_SUCCEED, DELETE_COLUMN_BY_ID,
    DELETE_TODO,
    EDIT_TODO,
    GET_ALL_COLUMNS_SUCCEED,
    GET_TODO_LIST_SUCCEED,
    LOADING,
} from './constants'
import {ITodosState} from "../Components/Interfaces";
import {TodosActionTypes} from "./action";

const initialState: ITodosState = {
    items: [],
    loading: false,
    todoColumns: []
}

export default function todos(state = initialState, action: TodosActionTypes){
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

        case CREATE_TODO_COLUMN_SUCCEED:
            return {...state, todoColumns: [...state.todoColumns, action.payload]}

        case GET_ALL_COLUMNS_SUCCEED:
            return {...state, todoColumns:  action.payload}

        case DELETE_COLUMN_BY_ID:
            return {...state, todoColumns: state.todoColumns.filter(col => col.id !== action.payload)}

        default:
            return state
    }
}
