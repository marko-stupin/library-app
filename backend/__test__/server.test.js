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
