const Book = require("../models/bookModel");
const mongoose = require("mongoose");
const {
  getBooks,
  getBook,
  createBook,
  deleteBook,
  updateBook,
} = require("../controllers/bookController");

describe("GET all books", () => {
  it("should retrieve and send books", async () => {
    const mockBooks = [
      { title: "Book 1", createdAt: new Date("2023-01-01") },
      { title: "Book 2", createdAt: new Date("2023-02-01") },
    ];

    // Mocking book model
    const findMock = jest.spyOn(Book, "find").mockReturnValue({
      sort: jest.fn().mockResolvedValue(mockBooks),
    });

    // Mocking response object
    const sendMock = jest.fn();
    const res = { status: jest.fn(() => ({ json: sendMock })) };

    // Calling getBooks function
    await getBooks(null, res);

    expect(findMock).toHaveBeenCalledWith({});
    expect(findMock).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(sendMock).toHaveBeenCalledWith(mockBooks);
  });
});

describe("GET a single book", () => {
  it("should retrieve and send the book", async () => {
    const mockBook = { title: "Mock Book" };

    mongoose.Types.ObjectId.isValid = jest.fn().mockReturnValue(true);

    Book.findById = jest.fn().mockResolvedValue(mockBook);

    const sendMock = jest.fn();
    const res = { status: jest.fn(() => ({ json: sendMock })) };

    // Mocking request object with parameters
    const req = { params: { id: "mock-id" } };

    // Calling the getBook function
    await getBook(req, res);

    expect(mongoose.Types.ObjectId.isValid).toHaveBeenCalledWith("mock-id");
    expect(Book.findById).toHaveBeenCalledWith("mock-id");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(sendMock).toHaveBeenCalledWith(mockBook);
  });

  it("should return 404 if book id is invalid", async () => {
    mongoose.Types.ObjectId.isValid = jest.fn().mockReturnValue(false);

    const sendMock = jest.fn();
    const res = { status: jest.fn(() => ({ json: sendMock })) };

    const req = { params: { id: "invalid-id" } };

    await getBook(req, res);

    expect(mongoose.Types.ObjectId.isValid).toHaveBeenCalledWith("invalid-id");
    expect(res.status).toHaveBeenCalledWith(404);
    expect(sendMock).toHaveBeenCalledWith({ error: "Book does not exist" });
  });

  it("should return 404 if book is not found", async () => {
    mongoose.Types.ObjectId.isValid = jest.fn().mockReturnValue(true);

    Book.findById = jest.fn().mockResolvedValue(null);

    const sendMock = jest.fn();
    const res = { status: jest.fn(() => ({ json: sendMock })) };

    const req = { params: { id: "non-existent-id" } };

    await getBook(req, res);

    expect(mongoose.Types.ObjectId.isValid).toHaveBeenCalledWith(
      "non-existent-id"
    );
    expect(Book.findById).toHaveBeenCalledWith("non-existent-id");
    expect(res.status).toHaveBeenCalledWith(404);
    expect(sendMock).toHaveBeenCalledWith({ error: "Book does not exist" });
  });
});

describe("CREATE a new book", () => {
  it("should create and send the new book", async () => {
    const mockBook = { title: "New Book", author: "Author Name", copies: 5 };

    Book.create = jest.fn().mockResolvedValue(mockBook);

    const req = { body: mockBook };

    const sendMock = jest.fn();
    const res = { status: jest.fn(() => ({ json: sendMock })) };

    await createBook(req, res);

    expect(Book.create).toHaveBeenCalledWith(mockBook);
    expect(Book.create).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(sendMock).toHaveBeenCalledWith(mockBook);
  });
});

describe("DELETE book", () => {
  it("should delete and send the deleted book", async () => {
    const mockDeletedBook = { title: "Deleted Book" };

    mongoose.Types.ObjectId.isValid = jest.fn().mockReturnValue(true);

    Book.findByIdAndDelete = jest.fn().mockResolvedValue(mockDeletedBook);

    const sendMock = jest.fn();
    const res = { status: jest.fn(() => ({ json: sendMock })) };

    const req = { params: { id: "delete-id" } };

    await deleteBook(req, res);

    expect(mongoose.Types.ObjectId.isValid).toHaveBeenCalledWith("delete-id");
    expect(Book.findByIdAndDelete).toHaveBeenCalledWith({ _id: "delete-id" });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(sendMock).toHaveBeenCalledWith(mockDeletedBook);
  });

  it("should return 404 if book id is invalid", async () => {
    mongoose.Types.ObjectId.isValid = jest.fn().mockReturnValue(false);

    const sendMock = jest.fn();
    const res = { status: jest.fn(() => ({ json: sendMock })) };

    const req = { params: { id: "invalid-id" } };

    await deleteBook(req, res);

    expect(mongoose.Types.ObjectId.isValid).toHaveBeenCalledWith("invalid-id");
    expect(res.status).toHaveBeenCalledWith(404);
    expect(sendMock).toHaveBeenCalledWith({ error: "Book does not exist" });
  });

  it("should return 404 if book is not found", async () => {
    mongoose.Types.ObjectId.isValid = jest.fn().mockReturnValue(true);

    Book.findByIdAndDelete = jest.fn().mockResolvedValue(null);

    const sendMock = jest.fn();
    const res = { status: jest.fn(() => ({ json: sendMock })) };

    const req = { params: { id: "non-existent-id" } };

    await deleteBook(req, res);

    expect(mongoose.Types.ObjectId.isValid).toHaveBeenCalledWith(
      "non-existent-id"
    );
    expect(Book.findByIdAndDelete).toHaveBeenCalledWith({
      _id: "non-existent-id",
    });
    expect(res.status).toHaveBeenCalledWith(404);
    expect(sendMock).toHaveBeenCalledWith({ error: "Book does not exist" });
  });
});

describe("UPDATE book", () => {
  it("should update and send the updated book", async () => {
    const mockUpdatedBook = { _id: "update-id", title: "Updated Book" };

    mongoose.Types.ObjectId.isValid = jest.fn().mockReturnValue(true);

    Book.findOneAndUpdate = jest.fn().mockResolvedValue(mockUpdatedBook);

    const sendMock = jest.fn();
    const res = { status: jest.fn(() => ({ json: sendMock })) };

    const req = {
      params: { id: "update-id" },
      body: { title: "Updated Book" },
    };
  });

  it("should return 404 if book id is invalid", async () => {
    mongoose.Types.ObjectId.isValid = jest.fn().mockReturnValue(false);

    const sendMock = jest.fn();
    const res = { status: jest.fn(() => ({ json: sendMock })) };

    const req = {
      params: { id: "invalid-id" },
      body: { title: "Invalid Update" },
    };

    await updateBook(req, res);

    expect(mongoose.Types.ObjectId.isValid).toHaveBeenCalledWith("invalid-id");
    expect(res.status).toHaveBeenCalledWith(404);
    expect(sendMock).toHaveBeenCalledWith({ error: "Book does not exist" });
  });

  it("should return 404 if book is not found", async () => {
    mongoose.Types.ObjectId.isValid = jest.fn().mockReturnValue(true);

    Book.findOneAndUpdate = jest.fn().mockResolvedValue(null);

    const sendMock = jest.fn();
    const res = { status: jest.fn(() => ({ json: sendMock })) };

    const req = {
      params: { id: "non-existent-id" },
      body: { title: "Non-Existent Update" },
    };

    await updateBook(req, res);

    expect(mongoose.Types.ObjectId.isValid).toHaveBeenCalledWith(
      "non-existent-id"
    );
    expect(res.status).toHaveBeenCalledWith(404);
    expect(sendMock).toHaveBeenCalledWith({ error: "Book does not exist" });
  });
});
