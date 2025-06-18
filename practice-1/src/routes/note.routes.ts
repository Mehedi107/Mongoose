import express from 'express';
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

// ✅ Get single note by id
router.get('/notes/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const note = await Note.findById(id);
    res.status(200).json({ status: true, data: note });
  } catch (error) {
    res.status(400).json({ status: false, message: 'Failed to get note' });
  }
});

export default router;
