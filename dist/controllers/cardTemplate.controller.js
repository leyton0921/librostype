export class CardTemplateController {
    constructor(containerBooks) {
        this.containerBooks = containerBooks;
    }
    render(id, title, author, description, summary, publicationDate) {
        const figure = document.createElement("figure");
        figure.classList.add('card', 'col-md-4');
        const h2 = document.createElement('h2');
        h2.classList.add('card-title', 'text-center');
        h2.textContent = title;
        figure.appendChild(h2);
        const h3 = document.createElement('h4');
        h3.classList.add('card-title', 'text-center');
        h3.textContent = author;
        figure.appendChild(h3);
        const figcaption = document.createElement('figcaption');
        figcaption.classList.add('card-body', 'bg-light', 'text-dark');
        figure.appendChild(figcaption);
        const h4 = document.createElement('h4');
        h4.classList.add('card-title', 'text-center');
        h4.textContent = description;
        figure.appendChild(h4);
        const p = document.createElement('p');
        p.classList.add('card-title', 'text-center');
        p.textContent = summary;
        figure.appendChild(p);
        const h5 = document.createElement('h5');
        h5.classList.add('card-title', 'text-center');
        h5.textContent = publicationDate;
        figure.appendChild(h5);
        const div = document.createElement('div');
        div.classList.add('d-flex');
        const btnEdit = document.createElement('button');
        btnEdit.classList.add('btn', 'btn-warning');
        btnEdit.textContent = 'Edit';
        btnEdit.type = 'button';
        btnEdit.dataset.id = id;
        const btnDelete = document.createElement('button');
        btnDelete.classList.add('btn', 'btn-danger');
        btnDelete.textContent = 'Delete';
        btnDelete.type = 'button';
        btnDelete.dataset.id = id;
        div.appendChild(btnEdit);
        div.appendChild(btnDelete);
        figcaption.appendChild(div);
        this.containerBooks.appendChild(figure);
    }
}
