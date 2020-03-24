document.addEventListener('DOMContentLoaded',function(){
    Ui.display();
    addbtn.addEventListener('click',instantiate_append);
    table_body.addEventListener('click',Ui.remove_book);
});//this event listener checks for the dom to be loaded
//the store class handles communication with the localstorage api
class Store{
    //this method queries the local storage and returns an array of books
    static getbooks(){
        return JSON.parse(localStorage.getItem('books'));
    }
    //this method is used to add a book to the local storage
    static addbooks(book){
        let e_books=JSON.parse(localStorage.getItem('books'));
        if(e_books===null){
            e_books=[];
        }
        e_books.push(book);
        localStorage.setItem('books',JSON.stringify(e_books));
    }
    //this method is used to remove books from the local storage
    static removebooks(isbn){
        let e_books=JSON.parse(localStorage.getItem('books'));
        e_books=e_books.filter((e_book)=>{
            return e_book.isbn==isbn.innerText?false:true;
        });
        console.log(e_books);
        localStorage.setItem('books',JSON.stringify(e_books));
    }
}
//this class is a class used for book objects
class Book{
    constructor(title,author,isbn){
        this.title=title;
        this.author=author;
        this.isbn=isbn;
    }
}
//this class handles all interactions with the ui(dom)
class Ui{
    //this method is called during startup to display all books added earlier
    static display(){
        const list=Store.getbooks();
        if(list===null){
            return
        }
        list.forEach(element => {
            const row=document.createElement('tr');
            row.innerHTML=`<td>${element.title}</td><td>${element.author}</td><td>${element.isbn}</td><td><a href="#" id="delete"><i class="material-icons" style="color:red">close</i></a></td>`;
            table_body.appendChild(row);
        });
    }
    //this method is used to add a book to the display
    static add_book(book){
        Store.addbooks(book);
        const row=document.createElement('tr');
        row.innerHTML=`<td>${book.title}</td><td>${book.author}</td><td>${book.isbn}</td><td><a href="#" id="delete"><i class="material-icons" style="color:red">close</i></a></td>`;
        table_body.appendChild(row);
    }
    //this method is used to remove book from dom
    static remove_book(e){
        console.log(e.target.tagName);
        if(e.target.tagName=='I'){
            Ui.show_message('Your book has been removed','green');
            Store.removebooks(e.target.parentElement.parentElement.previousSibling);
            e.target.parentElement.parentElement.parentElement.remove();
        }
        e.preventDefault();
    }
    //this method is used to clear input fields after the book has been added
    static clear_input(){
        title.value='';
        author.value='';
        isbn.value='';
    }
    //this method handles the message dispaly on addition,deletion,errors
    static show_message(text,color){
        message.innerText=`${text}`;
        message.style.backgroundColor=color;
        message.style.display="block";
        message.style.padding="3%";
        setTimeout(() => {
            message.style.display="none";            
        }, 3000);
    }
}
//this section contains all elements selected
const title=document.getElementById('name');
const author=document.getElementById('author');
const isbn=document.getElementById('isbn');
const addbtn=document.getElementById('addbtn');
const message=document.getElementById('message');
const table_body=document.getElementById('list-body');
//this function is the event handler when the add button is clicked
function instantiate_append(e){
    if(title.value.length===0 || author.value.lenght===0 || isbn.value.length===0){
        Ui.show_message('please make sure you fill out all fields','red');
    }
    else{
    const book=new Book(title.value,author.value,isbn.value);
    Ui.clear_input();
    Ui.show_message('Your book has been added successfully','green');
    Ui.add_book(book);
    }
    e.preventDefault();
}

