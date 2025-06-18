import mongoose from 'mongoose';

// schemas
const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
});

// models
const Note = mongoose.model('Note', noteSchema);

export default Note;
