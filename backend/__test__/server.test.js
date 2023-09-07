require("dotenv").config();

const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../server");

describe("Connect to db and listen for req", () => {
  beforeAll(async () => {
    const mongoUri = process.env.MONGO_URI;
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it("should respond to req with correct status code", async () => {
    const response = await request(app).get("/api/books");
    expect(response.status).toBe(200);
  });

  it("should log requests", async () => {
    const consoleSpy = jest.spyOn(console, "log");
    const response = await request(app).get("/api/books");

    expect(consoleSpy).toHaveBeenCalledWith("/api/books", "GET");
    consoleSpy.mockRestore();
  });
});

describe("Integration tests", () => {
  beforeAll(async () => {
    const mongoUri = process.env.MONGO_URI;
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
  it("should create a new book", async () => {
    const res = await request(app)
      .post("/api/books")
      .send({ title: "Test Book", author: "Test Author", copies: 5 });

    const { _id } = res.body;
    const deleteRes = await request(app).delete(`/api/books/${_id}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.title).toEqual("Test Book");
    expect(res.body.author).toEqual("Test Author");
    expect(res.body.copies).toEqual(5);
  });

  it("should get all books", async () => {
    const res = await request(app).get("/api/books");

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should get a single book", async () => {
    const createRes = await request(app)
      .post("/api/books")
      .send({ title: "Test Book", author: "Test Author", copies: 5 });

    const { _id } = createRes.body;

    const getRes = await request(app).get(`/api/books/${_id}`);
    const deleteRes = await request(app).delete(`/api/books/${_id}`);

    expect(getRes.statusCode).toEqual(200);
    expect(getRes.body.title).toEqual("Test Book");
    expect(getRes.body.author).toEqual("Test Author");
    expect(getRes.body.copies).toEqual(5);
  });

  it("should update a book", async () => {
    const createRes = await request(app)
      .post("/api/books")
      .send({ title: "Test Book", author: "Test Author", copies: 5 });

    const { _id } = createRes.body;

    const updateRes = await request(app)
      .patch(`/api/books/${_id}`)
      .send({ title: "Updated Book", author: "Updated Author", copies: 6 });

    const deleteRes = await request(app).delete(`/api/books/${_id}`);

    expect(updateRes.statusCode).toEqual(200);
  });

  it("should delete a book", async () => {
    const createRes = await request(app)
      .post("/api/books")
      .send({ title: "Test Book", author: "Test Author", copies: 5 });

    const { _id } = createRes.body;

    const deleteRes = await request(app).delete(`/api/books/${_id}`);

    expect(deleteRes.statusCode).toEqual(200);
    expect(deleteRes.body._id).toEqual(_id);
  });
});
