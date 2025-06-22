import mongoose, { Schema } from 'mongoose';

export enum Genre {
  FICTION = 'FICTION',
  NON_FICTION = 'NON_FICTION',
  SCIENCE = 'SCIENCE',
  HISTORY = 'HISTORY',
  BIOGRAPHY = 'BIOGRAPHY',
  FANTASY = 'FANTASY',
}

const bookSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    genre: {
      type: String,
      enum: Object.values(Genre),
      required: true,
      trim: true,
    },
    isbn: { type: String, required: true, unique: true, trim: true },
    description: { type: String, trim: true }, // optional but trimmed if provided
    copies: { type: Number, required: true, min: 0 },
    available: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Instance Method
bookSchema.methods.updateAvailability = function () {
  this.available = this.copies > 0;
  return this.save();
};

export const Book = mongoose.model('Book', bookSchema);
