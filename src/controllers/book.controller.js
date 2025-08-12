import cloudinary from "../lib/cloudinary.js";
import {
    createBook,
    getBooksPaginated,
    getBooksByUser,
    getBookById,
    deleteBookById,
} from "../services/book.service.js";

// Create Book
export const addBook = async (req, res) => {
    try {
        const { title, caption, rating } = req.body;

        if (!req.file || !title || !caption || !rating) {
            return res.status(400).json({ message: "Please provide all fields" });
        }

        const newBook = await createBook({
            title,
            caption,
            rating,
            image: req.file.path,
            user: req.user._id,
        });

        res.status(201).json(newBook);
    } catch (error) {
        console.error("Error creating book", error);
        res.status(500).json({ message: error.message });
    }
};

// Get Paginated Books
export const getBooks = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;

        const { books, totalBooks } = await getBooksPaginated(page, limit);

        res.json({
            books,
            currentPage: page,
            totalBooks,
            totalPages: Math.ceil(totalBooks / limit),
        });
    } catch (error) {
        console.error("Error getting books", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get User's Books
export const getUserBooks = async (req, res) => {
    try {
        const books = await getBooksByUser(req.user._id);
        res.json(books);
    } catch (error) {
        console.error("Get user books error:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};

// Delete Book
export const deleteBook = async (req, res) => {
    try {
        const book = await getBookById(req.params.id);
        if (!book) return res.status(404).json({ message: "Book not found" });

        if (book.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // Delete from Cloudinary if exists
        if (book.image && book.image.includes("cloudinary")) {
            try {
                const publicId = book.image.split("/").pop().split(".")[0];
                await cloudinary.uploader.destroy(publicId);
            } catch (err) {
                console.log("Error deleting image from cloudinary", err);
            }
        }

        await deleteBookById(book._id);

        res.json({ message: "Book deleted successfully" });
    } catch (error) {
        console.error("Error deleting book", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
