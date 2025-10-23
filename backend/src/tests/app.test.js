import request from "supertest";
import app from "../src/index.js";

describe("API Health Check", () => {
  it("should return 200 OK for /", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe("API is working 🚀");
  });
});
