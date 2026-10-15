
const request = require("supertest");
const app = require("./app");

describe("Application health", () => {
  test("homepage returns 200", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
  });

  test("health endpoint returns healthy", async () => {
    const response = await request(app).get("/health");
    expect(response.status).toBe(200);
    expect(response.body.status).toBe("healthy");
  });
});
