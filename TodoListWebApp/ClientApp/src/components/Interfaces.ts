export interface SignForm {
    firstName: string
    lastName: string
    password: string
    email: string
}

export interface Item{
    id: number
    text: string
    finished: boolean
}

export interface Auth{
    token: string
}

export interface User {
    id: number
    firstName: string
    lastName: string
    password: string
    email: string
    role: string
    todosCount: number
}