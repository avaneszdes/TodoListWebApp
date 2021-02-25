import {
    ADD_TODO_SUCCEED,
    COMPLETE_TODO,
    DELETE_TODO,
    EDIT_TODO,
    GET_TODO_LIST_SUCCEED,
} from './constants'
import {Item} from "../Components/Interfaces";
import {TodosActionTypes} from "./action";



const initialState: Item[] = []

const todos = (state = initialState, action: TodosActionTypes) => {

    switch (action.type) {
        case DELETE_TODO:
            return state.filter(todo => todo.id !== action.payload)
        
        case ADD_TODO_SUCCEED:
            return [...state, action.payload]

        case COMPLETE_TODO: {
           return state.map(x => {
                if (x.id === action.payload.id) {
                    return {...x, finished: action.payload.finished} 
                }
                return x;
            });
        }
        
        case EDIT_TODO:
            return  state.map(x => {
                if (x.id === action.payload.id) {
                    return {...x, text: action.payload.text}  
                }
                 return x;
            })

        case GET_TODO_LIST_SUCCEED:
            return [...state, ...action.payload]
        
       
        default:
            return state
    }
}

export default todos