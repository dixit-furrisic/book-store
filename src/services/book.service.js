import Book from "../models/book.model.js";

export const createBook = async (data) => {
    const newBook = new Book(data);
    return await newBook.save();
};

export const getBooksPaginated = async (page, limit) => {
    const skip = (page - 1) * limit;
    const books = await Book.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("user", "username profileImage");
    const totalBooks = await Book.countDocuments();
    return { books, totalBooks };
};

export const getBooksByUser = async (userId) => {
    return await Book.find({ user: userId }).sort({ createdAt: -1 });
};

export const getBookById = async (id) => {
    return await Book.findById(id);
};

export const deleteBookById = async (id) => {
    return await Book.findByIdAndDelete(id);
};
