const server = require("../api/server.js");
const request = require("supertest");

describe("Server Tests", () => {
    describe("GET /", () => {
        it("Should respond with status code of 200", async () => {
            await request(server).get("/").then(res => {
                expect(res.status).toBe(200);
                expect(res.status).not.toBe(500);
            });
        });
    });
});