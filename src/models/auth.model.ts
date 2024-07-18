export interface BodyRequestLogin { // peticion para logear un usuario
    email: string,
    password: string
}

export interface BodyResponseLogin{
    message: string,
    data: Record<string,string>
}