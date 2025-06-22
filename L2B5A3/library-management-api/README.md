# Library Management API

A RESTful API for managing a library's book inventory and borrowing system, built with Node.js, Express, TypeScript, and MongoDB (via Mongoose).

## Features

- **Book Management**

  - Add new books to the library.
  - Retrieve a list of all books, with optional filtering, sorting, and limiting.
  - Get details of a specific book by its ID.
  - Update book information.
  - Delete books from the library.

- **Borrowing System**

  - Borrow books (with quantity and due date).
  - Automatically updates book availability and copies.
  - Get a summary of borrowed books, including total quantities and book details.

- **Robust Data Models**

  - Book model with fields: title, author, genre, ISBN, description, copies, and availability.
  - Borrow model with references to books, quantity, and due date.

- **API Responses**
  - Consistent JSON responses for success and error handling.

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm (v8+ recommended)
- MongoDB instance (local or cloud, e.g., MongoDB Atlas)

### Installation

1. **Clone the repository:**

   ```bash
   git clone <your-repo-url>
   cd library-management-api
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add your MongoDB connection string:

   ```
   MONGO_URI=mongodb://localhost:27017/librarydb
   ```

   Replace the value with your actual MongoDB URI if needed.

4. **Run the application:**

   - For development (with hot reload):
     ```bash
     npm run dev
     ```
   - For production build:
     ```bash
     npm run build
     npm start
     ```

5. **API will be available at:**  
   `http://localhost:3000/`

## API Endpoints

### Book Routes

- `POST   /api/books` — Create a new book
- `GET    /api/books` — Get all books (supports `filter`, `sortBy`, `sort`, `limit` query params)
- `GET    /api/books/:bookId` — Get a book by ID
- `PUT    /api/books/:bookId` — Update a book by ID
- `DELETE /api/books/:bookId` — Delete a book by ID

### Borrow Routes

- `POST   /api/borrow` — Borrow a book (requires `book`, `quantity`, `dueDate` in body)
- `GET    /api/borrow` — Get a summary of borrowed books

## Project Structure

```
src/
  config/         # Database connection
  models/         # Mongoose models (Book, Borrow)
  routes/         # Express route handlers
  index.ts        # Application entry point
```

## Technologies Used

- Node.js, Express
- TypeScript
- MongoDB, Mongoose
- dotenv, cors

## License

This project is licensed under the ISC License.
