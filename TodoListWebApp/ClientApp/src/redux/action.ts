import {Item, SignForm} from "../Components/Interfaces";
import {
    ADD_TODO,
    ADD_TODO_SUCCEED, AUTHORIZATION, AUTHORIZATION_SUCCEED,
    COMPLETE_TODO, COMPLETE_TODO_SUCCEED,
    DELETE_TODO,
    DELETE_TODO_SUCCEED,
    EDIT_TODO, EDIT_TODO_SUCCEED,
    GET_TODO_LIST, GET_TODO_LIST_SUCCEED, REGISTRATION
} from "./constants";


export interface AddTodoAction {
    type: typeof ADD_TODO,
    payload: string
}

export interface AddTodoSucceedAction {
    type: typeof ADD_TODO_SUCCEED,
    payload: { text: string, id: number, finished: boolean }
}

export interface DeleteTodoAction {
    type: typeof DELETE_TODO,
    payload: number
}

export interface DeleteTodoSucceedAction {
    type: typeof DELETE_TODO_SUCCEED,
    payload: number
}

interface EditTodoAction {
    type: typeof EDIT_TODO,
    payload: Item
}

export interface EditTodoSucceedAction {
    type: typeof EDIT_TODO_SUCCEED,
    payload: Item
}

interface CompleteTodoAction {
    type: typeof COMPLETE_TODO,
    payload: Item
}

export interface CompleteTodoSucceedAction {
    type: typeof COMPLETE_TODO_SUCCEED,
    payload: Item
}

interface InitializeTodoListAction {
    type: typeof GET_TODO_LIST,
    payload: Item[]
}

export interface InitializeTodoListSucceedAction {
    type: typeof GET_TODO_LIST_SUCCEED,
    payload: Item[]
}

export interface RegistrationAction {
    type: typeof REGISTRATION,
    payload: SignForm
}


export interface AuthorizationAction {
    type: typeof AUTHORIZATION,
    payload: SignForm
}

export interface AuthorizationSucceedAction {
    type: typeof AUTHORIZATION_SUCCEED,
    payload: string
}

export function createTodoSucceed(id: number, text: string, finished: boolean): AddTodoSucceedAction {
    return {
        type: ADD_TODO_SUCCEED,
        payload: {
            id,
            text,
            finished
        }
    }
}


export type TodosActionTypes =
    AddTodoAction
    | DeleteTodoAction
    | EditTodoAction
    | CompleteTodoAction
    | InitializeTodoListAction
    | AddTodoSucceedAction
    | InitializeTodoListSucceedAction
    | RegistrationAction
    | AuthorizationAction
    | AuthorizationSucceedAction
