export interface BodyResponseGetAllBooks {
    message: string;
    data:    Datum[];
}

export interface Datum {
    id:        string;
    title:      Role;
    author:      string;
    description:  string;
    summary:     string;
    publicationDate: string;
    createBy: string;
    updatedBy: null;
    deletedBy: null;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: null;
    files: any[];
}

export enum Role {
    Admin = "admin",
    User = "user",
}

export interface BodyRequesteCreateBook{
    title :string;
    author: string,
    description: string,
    summary: string,
    publicationDate: string
}

export interface BodyResponseCreateBook {
    message: string,
    data : Record<string,string>
}

export interface BodyResponseGetId{
    message: string,
    data: Record<string,string>
}

export interface BodyRequestUpdateBook{
    title :string;
    author: string,
    description: string,
    summary: string,
    publicationDate: string
}

export interface BodyResponseUpdateBook{
    message:string,
    data: Record<string,string>
}

export interface BodyResponseDeleteBook{
    message:string,
    data: null
}