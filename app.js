// ES5 Version BookList

// Book constructor 
// book constructor will handles creating the actual book object 
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}


// UI constructor 
// ui constructor will consist of set of prototype methods such as add, delete book to list and , show alert 

function UI(){}




// Add a book to list 
UI.prototype.addBookToList = function (book) {
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
  //  show alert 
  UI.prototype.showAlert = function(message, className){
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

// Delete book
UI.prototype.deleteBook = function(target) {
  if (target.className ==='delete') {
      target.parentElement.parentElement.remove(); // we go up two level from a is in td first to go to td then go to tr which is the parent
  }
}




  // console.log(row);
  // console.log(book);

// clear fields
UI.prototype.clearFields = function () {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
}


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

  // validation for inputs like clear
  if (title === '' || author === '' || isbn === '') {
    // error alert to client 
    // alert(123)
    ui.showAlert('Please fill in all fields', 'error');
  } else {
    // Add book to list 
    ui.addBookToList(book);

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
  ui.deleteBook(e.target); // because it takes in a target of an event 

  // show an alert 
  ui.showAlert('Book Removed', 'success');

  e.preventDefault();
})
