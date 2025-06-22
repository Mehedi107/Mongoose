import { Request, Response, Router } from 'express';
import { Book } from '../models/book.model';

export const bookRouter = Router();

// ✅ Create book
bookRouter.post('/api/books', async (req: Request, res: Response) => {
  try {
    const book = await Book.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Book created successfully',
      data: book,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to create book',
      error,
    });
  }
});

// ✅ Get all books
bookRouter.get('/api/books', async (req: Request, res: Response) => {
  try {
    const { filter, sortBy, sort, limit } = req.query;

    const books = await Book.find({ genre: filter })
      .sort({ [sortBy]: sort })
      .limit(limit);

    console.log('>>>>>', books);

    if (books.length === 0) {
      res.status(400).json({
        success: false,
        message: 'Failed to retrieved book',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Books retrieved successfully',
      data: books,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to retrieved books',
      error,
    });
  }
});

// ✅ Get book by ID
bookRouter.get('/api/books/:bookId', async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;

    const book = await Book.findById(bookId);

    res.status(200).json({
      success: true,
      message: 'Book retrieved successfully',
      data: book,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `No book found `,
      error,
    });
  }
});

// ✅ Update book by ID
bookRouter.put('/api/books/:bookId', async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;
    const updateData = req.body;

    const updatedBook = await Book.findByIdAndUpdate(bookId, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: 'Book updated successfully',
      data: updatedBook,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to update book',
      error,
    });
  }
});

// ✅ Delete a book
bookRouter.delete('/api/books/:bookId', async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;

    const deletedBook = await Book.findByIdAndDelete(bookId);
    res.status(200).json({
      success: true,
      message: 'Book deleted successfully',
      data: null,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to delete book',
      error,
    });
  }
});
