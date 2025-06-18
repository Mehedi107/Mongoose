import mongoose from 'mongoose';

// schemas
const noteSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  category: {
    type: String,
    enum: ['personal', 'student', 'company', 'others'],
    default: 'personal',
  },
  pinned: { type: Boolean, default: false },
  date: { type: Date, default: Date.now },
});

// models
const Note = mongoose.model('Note', noteSchema);

export default Note;
