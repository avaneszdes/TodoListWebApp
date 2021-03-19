import {Auth, Role} from "../Components/Interfaces";
import {TodosActionTypes} from "./action";
import {AUTHORIZATION_SUCCEED, LOG_OUT, REGISTRATION} from "./constants";
import jwt_decode, {JwtPayload} from "jwt-decode";

export interface CustomJwtPayload extends JwtPayload {
    role: Role | null;
    name: string | null
}

const getAuthState = (): Auth => {
    const token = localStorage.getItem('token')!
    let role: Role | null = null
    let name: string | null = ''
    
    if (token) {
        const jwt = Object.values(jwt_decode<CustomJwtPayload>(token))
        const profile = JSON.parse(jwt[1])
        role = profile.Role || null
        name = profile.FirstName || null
    }
    return {
        token,
        role,
        name,
    }

}

const initialState: Auth = getAuthState();

const auth = (state = initialState, action: TodosActionTypes) => {

    switch (action.type) {
        case REGISTRATION:
            return action.payload

        case AUTHORIZATION_SUCCEED:
            return {token: action.payload.token, role: action.payload.role, name: action.payload.name}

        case LOG_OUT:
            return {token: action.payload, role: action.payload, name: action.payload}

        default:
            return state
    }
}

export default auth