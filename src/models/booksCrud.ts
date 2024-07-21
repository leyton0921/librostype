import { CardTemplateController } from "../controllers/cardTemplate.controller.js";
import { BooksController } from "../controllers/books.controller.js";

const URL_BOOKS: string = 'http://190.147.64.47:5155';
const btnLogout = document.querySelector("#btn-logout")as HTMLButtonElement;
const prevpage = document.querySelector("#prev-page")as HTMLButtonElement;
const nextpage = document.querySelector("#next-page")as HTMLButtonElement;
const token = localStorage.getItem("authToken");
let currentPage: number = 1;
const limit: number = 10;

// boton salir
btnLogout.addEventListener("click",(e:Event)=>{
    localStorage.removeItem("authToken");
    window.location.href ="index.html"

})

if(!token){
    alert("Authentication token is missing. Please log in.")
    window.location.href= "index.html"
}else{
    const containerBooks = document.querySelector(".container-books")as HTMLDivElement;
    const form= document.querySelector("form")as HTMLFormElement;
    const title = document.querySelector("#title")as HTMLInputElement;
    const author = document.querySelector("#author")as HTMLInputElement;
    const description = document.querySelector("#description")as HTMLInputElement;
    const summary = document.querySelector("#summary")as HTMLInputElement;
    const publicationDate = document.querySelector("#publication-date")as HTMLInputElement;
    let idCache: undefined| string;

    const cardTemplate = new CardTemplateController(containerBooks)

    prevpage.addEventListener("click", async (e:Event)=>{
        if(currentPage >= 1){
            currentPage--;
            await allBooks(limit,currentPage);
        }
    });

    nextpage.addEventListener("click",async (e:Event)=>{
        if(currentPage>= 1){
            currentPage++;
            await allBooks(limit,currentPage);
        }
    });

    form.addEventListener("submit",async (e:Event)=>{
        e.preventDefault();
        const crudBooks = new BooksController(URL_BOOKS);

        if(idCache === undefined){
            await crudBooks.create(title,author,description,summary,publicationDate, token as string)
        }else{
            await crudBooks.update(idCache,title,author,description,summary,publicationDate,token as string);
            idCache = undefined
        }

        form.reset();
        await allBooks(limit,currentPage)
    });

    containerBooks.addEventListener("click", async (e:Event)=>{
        if(e.target instanceof HTMLButtonElement){
            const crudBooks = new BooksController(URL_BOOKS);

            if(e.target.classList.contains("btn-warning")){
                idCache = e.target.dataset.id;

                if(idCache){
                    const book = await crudBooks.getById(idCache,token as string);
                    title.value = book.data.title;
                    author.value = book.data.author;
                    description.value = book.data.description;
                    summary.value = book.data.summary;
                    publicationDate.value = book.data.publicationDate;
                }
                }else if(e.target.classList.contains("btn-danger")){
                    let bookId = e.target.dataset.id

                    if(bookId){
                        const confirmDelete = confirm("Are you sure you want to delete?");
                        if(confirmDelete){
                            await crudBooks.deleteBook(bookId,token as string);
                            idCache = undefined;
                            await allBooks(limit,currentPage);
                        }
                    }
                }
            }
        })

    async function allBooks(limit:number,currentPage:number) {
        const crudBooks = new BooksController(URL_BOOKS);
        try{
            const response = await crudBooks.allBooks( token as string, limit, currentPage);
            console.log(`Respuesta de allBooks ${response}`)
            const books = response.data;

            containerBooks.innerHTML = '';

            for(const book of books){
                cardTemplate.render(book.id,book.title,book.author,book.description,book.summary,book.publicationDate);
            }


        }catch (error){
            console.error("Erroe fetching books:",error);
        }
    }
    allBooks(limit,currentPage);

}