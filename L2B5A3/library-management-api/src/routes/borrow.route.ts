import { Request, Response, Router } from 'express';
import { Book } from '../models/book.model';
import { Borrow } from '../models/borrow.model';

export const borrowRouter = Router();

// ✅ Borrow a Book
borrowRouter.post('/', async (req: Request, res: Response) => {
  try {
    const { book, quantity, dueDate } = req.body;
    const targetBook = await Book.findById(book);

    if (targetBook.copies < quantity) {
      return res.status(400).json({
        success: false,
        message: 'Not enough copies available to borrow',
      });
    }

    // Deduct quantity from available copies
    targetBook.copies -= quantity;

    if (targetBook.copies <= 0) targetBook.available = false;

    await targetBook.save();

    const borrowRecord = await Borrow.create({ book, quantity, dueDate });

    res.status(201).json({
      success: true,
      message: 'Book borrowed successfully',
      data: borrowRecord,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Borrow request failed',
      error,
    });
  }
});

// ✅ Borrowed book summery
borrowRouter.get('/', async (req: Request, res: Response) => {
  try {
    const summery = await Borrow.aggregate([
      // Pipeline 1 (group books by id)
      {
        $group: {
          _id: '$book',
          totalQuantity: { $sum: '$quantity' },
        },
      },
      // Pipeline 2 (find details of above books by id)
      {
        $lookup: {
          from: 'books',
          localField: '_id',
          foreignField: '_id',
          as: 'bookDetails',
        },
      },
      // Pipeline 3 (as $lookup return array so using $unwind make it object)
      {
        $unwind: '$bookDetails',
      },
      // Pipeline 4 (only want to see desire fields of the above object)
      {
        $project: {
          _id: 0,
          book: {
            title: '$bookDetails.title',
            isbn: '$bookDetails.isbn',
          },
          totalQuantity: 1,
        },
      },
    ]);

    res.status(200).json({
      status: true,
      message: 'Retrieved Book summery',
      data: summery,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: 'Failed to retrieved book summery',
      error,
    });
  }
});
