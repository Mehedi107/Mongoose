import express from 'express';
import Note from '../models/note';

const router = express.Router();

router.post('/create-note', async (req, res) => {
  try {
    const newNote = new Note(req.body);
    await newNote.save();
    res.status(201).json({ status: true, message: 'Note saved successfully!' });
  } catch (error) {
    res.status(400).json({ status: false, message: 'Error saving note!' });
  }
});

export default router;
