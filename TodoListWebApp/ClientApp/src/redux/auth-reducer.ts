import {Auth, Role} from "../Components/Interfaces";
import {TodosActionTypes} from "./action";
import {
    AUTHORIZATION_SUCCEED,
    EDIT_USER_PHOTO,
    GET_USER_PHOTO,
    GET_USER_PHOTO_SUCCEED,
    LOG_OUT,
    REGISTRATION
} from "./constants";
import jwt_decode, {JwtPayload} from "jwt-decode";

export interface CustomJwtPayload extends JwtPayload {
    role: Role | null;
    name: string | null
}

const getAuthState = (): Auth => {
    const token = localStorage.getItem('token')!
    let role: Role | null = null
    let name: string | null = ''
    let photo: string = ''
    let id: number = 0

    if (token) {
        const jwt = Object.values(jwt_decode<CustomJwtPayload>(token))
        const profile = JSON.parse(jwt[1])
        role = profile.Role || null
        name = profile.FirstName || null
        photo = profile.Photo || ""
        id = profile.Id
    }
    return {
        token,
        role,
        name,
        photo,
        id,
    }

}

const initialState: Auth = getAuthState();

const auth = (state = initialState, action: TodosActionTypes) => {

    switch (action.type) {
        case REGISTRATION:
            return action.payload

        case AUTHORIZATION_SUCCEED:
            return {
                token: action.payload.token,
                role: action.payload.role,
                name: action.payload.name,
                id: action.payload.id,
                photo: action.payload.photo
            }

        case LOG_OUT:
            return {token: action.payload, role: action.payload, name: action.payload}

        case EDIT_USER_PHOTO:
            return {...state, photo: action.payload.photo, id: action.payload.id}

        case GET_USER_PHOTO:
            return {...state, photo: action.payload}

        case GET_USER_PHOTO_SUCCEED:
            return {...state, photo: action.payload}

        default:
            return state
    }
}

export default auth