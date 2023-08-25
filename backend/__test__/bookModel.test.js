const mongoose = require("mongoose");
const Book = require("../models/bookModel");

describe("Book Schema", () => {
  it("should be valid with valid properties", () => {
    const validBook = new Book({
      title: "Test Title",
      author: "Test Author",
      copies: 3,
    });

    const validationResult = validBook.validateSync();
    expect(validationResult).toBeUndefined();
  });

  it("should require a title", () => {
    const bookWithoutTitle = new Book({
      author: "Test Author",
      copies: 2,
    });

    const validationResult = bookWithoutTitle.validateSync();
    expect(validationResult.errors.title).toBeDefined();
  });

  it("should require an author", () => {
    const bookWithoutAuthor = new Book({
      title: "Test Title",
      copies: 4,
    });

    const validationResult = bookWithoutAuthor.validateSync();
    expect(validationResult.errors.author).toBeDefined();
  });

  it("should require copies to be a number", () => {
    const bookWithInvalidCopies = new Book({
      title: "Test Title",
      author: "Test Author",
      copies: "invalid",
    });

    const validationResult = bookWithInvalidCopies.validateSync();
    expect(validationResult.errors.copies).toBeDefined();
  });
});
