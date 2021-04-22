export interface SignForm {
    firstName: string
    lastName: string
    password: string
    email: string
}

export interface Item{
    id: number
    text: string
    isComplete: boolean
}
export interface ITodosState {
    items: Item[]
    loading: boolean
}

export enum Role {
    Admin = 1,
    User = 2
}



export interface Auth{
    token: string | null;
    role: Role | null;
    name: string | null
    photo: string
    id: number
}

export interface User {
    id: number
    firstName: string
    lastName: string
    password: string
    email: string
    role: string
    todosCount: number
    photo: string
    
}