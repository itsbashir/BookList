// ES6 

class Book {
  constructor (title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  // All the methods
  addBookToList(book){
    const list = document.getElementById('book-list');

    // create an element 

    const row = document.createElement('tr');
    // append to html 
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class='delete'>X<a></td>
    `
    // Append to list
    list.appendChild(row);
  }

  showAlert(message, className){
    // create a div
    const div = document.createElement('div');
    // Add class name 
    div.className = `alert ${className}`;

    // Add text 
    div.appendChild(document.createTextNode(message));

    // insert into DOM using parent 
    const container = document.querySelector('.container');
    // get the form so it can placed above it 
    const form = document.querySelector('#book-form');
    // Insert alert 
    container.insertBefore(div, form); // take container as parent, take two parameters: 1 what we want to insert and then what we want before it 

    // set time out after 3seconds
    setTimeout(function(){
      document.querySelector('.alert').remove()
    }, 3000);
  }

  deleteBook(target){
    if (target.className ==='delete') {
      target.parentElement.parentElement.remove(); // we go up two level from a is in td first to go to td then go to tr which is the parent
  }
  }
  
  clearFields(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }
}

// Local storage class

class Store {

  // getBook will fetch from local storage

  static getBooks(){
    let books;
      if (localStorage.getItem('books') === null) {
      books = []; // if nulll mean an empty array 
    } else {
      books = JSON.parse(localStorage.getItem('books')) ; // we need it to be a js object run it through json parse function to make it 
    }
    return books; // therefore when we a book from local storage we can just run this function 
  } 
  
  // displaying book on DOM/UI
  static displayBooks (){
    // get the books from local storage 
    const books = Store.getBooks();// we are using class due to static method no need to instantiate anything like .this
    books.forEach(function (book){
      //  by instantiate the class of ui 
      const ui = new UI;
      // add book to ui 
      ui.addBookToList(book)
    }); // we need to put it into the ui 

  }
  // will add to local storage
  static addBook (book) {
    // get the books from local storage 
    const books = Store.getBooks();// we are using class due to static method no need to instantiate anything like .this
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books)); // Also set it books array with json stringify to store it local storage
  }
  // we dont have id's will use something unique ISBN to get we will use the value of 
  static removeBook (isbn){
    console.log(isbn); // testing to see if it works in

    
    // get the book from local storage using 
    const books = Store.getBooks();
    
    // to remove it we will loop through it 
    books.forEach(function (book, index){
      if (book.isbn === isbn) { 
        books.splice(index, 1); // books is the entire array, split it the index and remove 1
      }; 
      // after the forEach set local storage  
      localStorage.setItem('books', JSON.stringify(books));
      
      // check if the book  which passed an argument its isbn matches the isbn of the method/function of removeBook then we want to delete using splice the index which added as a call back. remove the index 1 
    }); 

  }

}
// DOM Load event 

document.addEventListener('DOMContentLoaded', Store.displayBooks)


// Event listeners for add book
document.getElementById('book-form').addEventListener('submit', function(e){
  // get the field value/ form values
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn =document.getElementById('isbn').value; 

  // instantiate the book constructor/object 
  const book = new Book(title, author, isbn);
  // console.log(book);

  // instantiate a UI 
  const ui = new UI();
  console.log(ui);

  // validation for inputs like clear
  if (title === '' || author === '' || isbn === '') {
    // error alert to client 
    // alert(123)
    ui.showAlert('Please fill in all fields', 'error');
  } else {
    // Add book to list 
    ui.addBookToList(book);

    // Add to local storage
    Store.addBook(book);

    // show success
    ui.showAlert('Book Added ', 'success') ;
  
    // clear field once added 
    ui.clearFields();
  }
  // console.log(ui); //
  // console.log(title, author, isbn);
  e.preventDefault();
});




// Event listener for deletion using delegation
// use the parent of the to delete it since the delete is an empty row
document.getElementById('book-list').addEventListener('click', function (e) {
  // we need to target the x 
  // instantiate the UI
  const ui = new UI();
  // Delete book ui 
  ui.deleteBook(e.target); // because it takes in a target of an event. 
  
  // we are only passing in the target and inside the UI delete book we passing in target. then deleteing the parent of the parent of the li. therefore to remove from local storeage get the isbn number using dom 
  
  
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent); // return the isbn number as explained below how.
  
  // take the event target  which will be the a tag that clicked on by the client and then get the parent element. the parent which is the td. we will use the DOM previous element sibling method to get it and get the text content to get it 



  // show an alert 
  ui.showAlert('Book Removed', 'success');

  e.preventDefault();
})
