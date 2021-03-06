import {Auth, Item, SignForm, UpdatePassword, User} from "../Components/Interfaces";
import {
    ADD_TODO,
    ADD_TODO_SUCCEED,
    AUTHORIZATION,
    AUTHORIZATION_SUCCEED, CLEAR_ERROR_MESSAGE,
    COMPLETE_TODO,
    COMPLETE_TODO_SUCCEED,
    DELETE_TODO,
    DELETE_USER,
    EDIT_TODO,
    EDIT_TODO_SUCCEED,
    EDIT_USER,
    EDIT_USER_PHOTO,
    EDIT_USER_PHOTO_SUCCEED,
    EDIT_USER_SUCCEED,
    GET_ERROR_MESSAGE_SUCCEED,
    GET_TODO_LIST,
    GET_TODO_LIST_SUCCEED,
    GET_USER_PHOTO,
    GET_USER_PHOTO_SUCCEED,
    GET_USERS,
    GET_USERS_SUCCEED,
    LOADING,
    LOG_OUT,
    REGISTRATION, SEND_USER_PASSWORD, CHANGE_USER_PASSWORD_SUCCEED
} from "./constants";


export interface AddTodoAction {
    type: typeof ADD_TODO,
    payload: string
}

export interface AddTodoSucceedAction {
    type: typeof ADD_TODO_SUCCEED,
    payload: { text: string, id: number, finished: boolean, createdDate: string }
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

export function createTodoSucceed(id: number, text: string, finished: boolean, createdDate: string): AddTodoSucceedAction {
    return {
        type: ADD_TODO_SUCCEED,
        payload: {
            id,
            text,
            finished,
            createdDate
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

export interface EditUserPhoto {
    type: typeof EDIT_USER_PHOTO,
    payload: { photo: string, id: number }
}

export interface EditUserPhotoSucceed {
    type: typeof EDIT_USER_PHOTO_SUCCEED,
    payload: { photo: string, id: number }
}

export interface GetUserPhotoSucceed {
    type: typeof GET_USER_PHOTO_SUCCEED,
    payload: string
}

export interface GetUserPhoto {
    type: typeof GET_USER_PHOTO,
    payload: string
}

export interface SendUserPassword {
    type: typeof SEND_USER_PASSWORD,
    payload: string
}

export interface GetErrorMessage {
    type: typeof GET_ERROR_MESSAGE_SUCCEED,
    payload: string
}

export interface ClearErrorMessage {
    type: typeof CLEAR_ERROR_MESSAGE,
    payload: string
}

export interface ChangeUserPasswordSucceed {
    type: typeof CHANGE_USER_PASSWORD_SUCCEED,
    payload: UpdatePassword
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
    | EditUserPhoto
    | EditUserPhotoSucceed
    | GetUserPhotoSucceed
    | GetUserPhoto
    | SendUserPassword
    | GetErrorMessage
    | ClearErrorMessage
    | ChangeUserPasswordSucceed

