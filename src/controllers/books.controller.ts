import { BodyRequesteCreateBook, BodyResponseCreateBook, BodyResponseGetAllBooks } from "../models/books.model";

export class BooksController{
    public domain:string;

    constructor(domain:string){
        this.domain = domain;
    }

    async allbooks(token:string,limit:number,page:number):Promise<BodyResponseGetAllBooks>{
        const headers:Record<string,string>={
            'accept': '*/*' ,
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${token}`
        };

        const reqOptions:RequestInit={
            method: 'GET',
            headers: headers
        };

        const response = await fetch(`${this.domain}/api/v1/books?limit=${limit}&page=${page}`,reqOptions)

        console.log(response)

        if(!response.ok){
            throw new Error(`Error al obtener libros: ${response.status}: ${response.statusText} `)
        }

        const responseBodyGetAllBooks:BodyResponseGetAllBooks = await response.json();

        return responseBodyGetAllBooks
    }

    async create(tittle:HTMLInputElement, author:HTMLInputElement, description:HTMLInputElement,summary:HTMLInputElement, publicationDate:HTMLInputElement, token:string ):Promise<BodyResponseCreateBook>{
        const newBook: BodyRequesteCreateBook = {
            tittle : tittle.value,
            author: author.value,
            description: description.value,
            summary:summary.value,
            publicationDate: publicationDate.value
        };

        const headers:Record<string,string>={
            'accept': '*/*' ,
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${token}`
        };

        const reqOptions:RequestInit = {
            method: "POST",
            headers: headers,
            body: JSON.stringify(newBook)
        };

        const response:Response = await fetch(`${this.domain}/api/v1/books`);

        if(!response.ok){
            throw new Error(`Error al obtener libros: ${response.status}: ${response.statusText} `)

        }

        const responseBodyCreateBooks:BodyResponseCreateBook= await response.json();

        return responseBodyCreateBooks

    }

    async getById(){
        
    }
}