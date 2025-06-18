import express, { Request, Response, Router } from 'express';
import Note from '../models/note';

const router = express.Router();

// ✅ Create note
router.post('/create-note', async (req, res) => {
  try {
    const newNote = new Note(req.body);
    await newNote.save();
    res.status(201).json({ status: true, message: 'Note saved successfully!' });
  } catch (error) {
    res.status(400).json({ status: false, message: 'Error saving note!' });
  }
});

// ✅ Get all notes
router.get('/notes', async (req, res) => {
  try {
    const notes = await Note.find();
    res
      .status(200)
      .json({ status: true, message: 'Note saved successfully!', data: notes });
  } catch (error) {
    res.status(400).json({ status: false, message: 'Failed to get all notes' });
  }
});

// ✅ GET a note by ID
router.get('/notes/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const note = await Note.findById(id);

    res.status(200).json({ status: true, data: note });
  } catch (error) {
    res.status(500).json({ status: false, message: 'Error retrieving note' });
  }
});

// ✅ Delete a note by ID
router.delete('/notes/delete/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedNote = await Note.findByIdAndDelete(id);

    // if (!deletedNote) {
    //   return res
    //     .status(404)
    //     .json({ status: false, message: 'Note not found to delete' });
    // }

    res.status(200).json({
      status: true,
      message: 'Note deleted successfully',
      data: deletedNote,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: 'Failed to delete note' });
  }
});

// ✅ UPDATE a note by ID
router.patch('/notes/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const note = req.body;

    const updatedNote = await Note.findByIdAndUpdate(id, note, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: true,
      message: 'Note updated successfully',
      data: updatedNote,
    });
  } catch (error) {
    res.status(500).json({ status: false, message: 'Failed to update note' });
  }
});

export default router;
