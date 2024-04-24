const express = require("express")
const router = express.Router()
// Import the user authentication function from Auth
const { userAuth } = require("../middleware/auth")

const { getBooks, findBooks, addBook, getBookById, updateBook, deleteBook } = require("./BookFunctions")

// The route and the method and function that are used in it
router.route("/getBooks").get(userAuth, getBooks) // Get all books from a user
router.route("/findBooks").get(userAuth, findBooks) // Search function 
router.route("/addBook").post(userAuth, addBook) // Upload a book
router.route("/getBookById/:bookId").get(userAuth, getBookById) // View one book's details by ID
router.route("/updateBook/:id").put(userAuth, updateBook)
router.route("/deleteBook/:id").delete(userAuth, deleteBook)

module.exports = router