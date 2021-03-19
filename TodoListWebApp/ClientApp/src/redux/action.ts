import {Auth, Item, SignForm, User} from "../Components/Interfaces";
import {
    ADD_TODO,
    ADD_TODO_SUCCEED, AUTHORIZATION, AUTHORIZATION_SUCCEED,
    COMPLETE_TODO, COMPLETE_TODO_SUCCEED,
    DELETE_TODO, DELETE_USER,
    EDIT_TODO, EDIT_TODO_SUCCEED, EDIT_USER, EDIT_USER_SUCCEED,
    GET_TODO_LIST, GET_TODO_LIST_SUCCEED, GET_USERS, GET_USERS_SUCCEED, LOADING, LOG_OUT, REGISTRATION
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
    payload: Auth
}

export interface LogOut {
    type: typeof LOG_OUT,
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

export interface GetUsersAction {
    type: typeof GET_USERS,
    payload: User[]
}

export interface GetUsersSucceedAction {
    type: typeof GET_USERS_SUCCEED,
    payload: User[]
}

export interface DeleteUserAction {
    type: typeof DELETE_USER,
    payload: number
}

interface EditUserAction {
    type: typeof EDIT_USER,
    payload: User
}

export interface EditUserSucceedAction {
    type: typeof EDIT_USER_SUCCEED,
    payload: User
}

export interface LoadingAction {
    type: typeof LOADING,
    payload: boolean
}

export interface LoadingActionSucceed {
    type: typeof LOADING,
    payload: boolean
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
    | LogOut
    | GetUsersAction
    | GetUsersSucceedAction
    | DeleteUserAction 
    | EditUserAction 
    | EditUserSucceedAction
    | LoadingAction
    | LoadingActionSucceed
