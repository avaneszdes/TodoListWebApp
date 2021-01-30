export interface SignForm {
    firstName: string
    lastName: string
    password: string
    email: string
}

export interface Item{
    id: number,
    text: string,
    finished: boolean
}

export interface AuthorizationForm{
    email: string
    password: string
}

