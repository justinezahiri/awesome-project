const express = require('express');
const router  = express.Router();
const Book = require('../models/book.js');

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

//get books page 
router.get('/books', (req, res, next) => {
  Book.find()
    .then(books => {
      console.log(books)
      res.render("books", {books});
    })
    .catch(error => {
      console.log(error)
    })
  
});

//get book id 
router.get('/book/:id', (req, res, next) => {
  let bookId = req.params.id;
  Book.findOne({'_id': bookId})
    .then(book => {
      res.render("book-detail", { book })
    })
    .catch(error => {
      console.log(error)
    })
});

//Add a book routes 
router.get('/books/add', (req, res, next) => {
  res.render("book-add");
});
//une fois les données saisies la route est la suivante 
router.post('/books/add', (req, res, next) => {
  const { name, author, description, rating } = req.body;
  const newBook = new Book({ name, author, description, rating})
  newBook.save()
  .then((book) => {
    res.redirect('/books');
  //TODO: ajouter un mecanisme de reporting de succès ou d'erreur pour l'experience UX 
  })
  .catch((error) => {
    console.log(error);
  })
});

//Edit book route 
router.get('/books/edit', (req, res, next) => {
  Book.findOne({_id: req.query.book_id})
  .then((book) => {
    res.render("book-edit", {book});
  })
  .catch((error) => {
    console.log(error);
  })
});
router.post('/books/edit', (req, res, next) => {
  const { name, author, description, rating } = req.body;
  Book.update({_id: req.query.book_id}, { $set: {name, author, description, rating }})
  .then((book) => {
    res.redirect('/books');
  })
  .catch((error) => {
    console.log(error);
  })
});

module.exports = router;

