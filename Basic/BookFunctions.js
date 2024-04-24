const bcrypt = require("bcryptjs")
// The user schema
const User = require("../Schemas/User")
const Book = require("../Schemas/Book")

// User authentication with JSON Web Token
const jwt = require('jsonwebtoken')
require('dotenv').config()
const jwtSecret = process.env.JWT_SECRET;

// Lists all the user's books
exports.getBooks = async (req, res) => {
    try {
        // User id comes from the auth middleware
        const userId = req.id;

        // Find the user by ID and populate the books field
        const books = await Book.find({ userId: userId });

        if (!books) {
            return res.status(404).json({ message: "Books not found" });
        }

        res.status(200).json({ books });
    } catch (error) {
        console.error("Error finding books:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

// Search function
exports.findBooks = async (req, res) => {
  try {
    const { title, genre, sortBy, page } = req.query;
    
    // User id comes from the auth middleware
    const userId = req.id;

    let query = { userId: userId };
    if (title) {
      query.title = { $regex: title, $options: 'i' }; // Case-insensitive
    }
    if (genre) {
      query.genre = genre;
    }

    // Sorting
    let sort = {};
    if (sortBy) {
        const parts = sortBy.split(':');
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
    }

    // Pagination
    const pageSize = 10;
    const currentPage = parseInt(page) || 1;

    // Total count of books
    const totalCount = await Book.countDocuments(query);

    const books = await Book.find(query)
    .sort(sort)
    .skip((currentPage - 1) * pageSize)
    .limit(pageSize);

    if(!books) {
      return res.status(404).json({ message: "Books not found" });
    }
    res.status(200).json({
          totalItems: totalCount,
          totalPages: Math.ceil(totalCount / pageSize),
          currentPage: currentPage,
          books
        });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// View a specific book
exports.getBookById = async (req, res) => {
    try {
        // User id comes from the auth middleware
        const userId = req.id;

        const bookId = req.params.bookId;

        // Find the user by ID and populate the books field
        const book = await Book.findOne({ _id: bookId, userId: userId });

        if (!book) {
            return res.status(404).json({ message: "Books not found" });
        }

        res.status(200).json({ book });
    } catch (error) {
        console.error("Error finding books:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

exports.addBook = async (req, res) => {
  try {
    const { title, author, genre } = req.body
    // User id comes from authentication middleware
    const userId = req.id;

    if (!title || !author || !genre || !userId) {
      return res.status(500).json({
        message: "Form information missing or user not found",
      })
    } else {
      const book = await Book.create({ userId, title, author, genre })
      if(book) {
        res.status(201).json({
          message: "Book successfully created",
          bookId: book._id,
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      message: "An error occurred",
      error: error.message,
    })
  }

}

exports.updateBook = async (req, res) => {
  try {
    const { title, author, genre } = req.body; // Removed 'id' from here
    const bookId = req.params.id; // Assuming you will use URL parameter for book ID
    const userId = req.id; // User id from authentication middleware

    // Check that all the data is present
    if (!bookId || !title || !author || !genre || !userId) {
      return res.status(400).json({
        message: "Required information is missing",
      });
    }

    // Check that the book document exists and belongs to the user
    const validateBook = await Book.findOne({ _id: bookId, userId: userId });
    if (!validateBook) {
      return res.status(404).json({ message: "Book not found for this user" });
    }

    // Update the book details
    validateBook.title = title;
    validateBook.author = author;
    validateBook.genre = genre;
    await validateBook.save();

    res.json({ message: "Book updated successfully" });
    
  } catch (error) {
    res.status(500).json({
      message: "An error occurred",
      error: error.message,
    });
  }
}

exports.deleteBook = async (req, res) => {
    try {
        const userId = req.id; // User id from auth middleware
        const bookId = req.params.id; // Book id from URL parameter

        const book = await Book.findOneAndDelete({ _id: bookId, userId: userId });

        if (!book) {
            return res.status(404).json({ message: "Book not found or not authorized to delete" });
        }

        res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
        console.error("Error deleting book:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};