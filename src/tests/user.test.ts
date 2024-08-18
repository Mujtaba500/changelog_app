import { jest } from "@jest/globals";
import { PrismaClient } from "@prisma/client";
import { mockDeep, mockReset, DeepMockProxy } from "jest-mock-extended";
import prisma from "../db/config";
import supertest from "supertest";
import app from "../app";

//Basically these mocks checks if all operations were done without actually doing them,
// Integration testing
jest.mock("../db/config", () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}));

let server;
beforeAll(() => {
  mockReset(prismaMock);
  server = app.listen(2000);
});

afterAll(async () => {
  mockReset(prismaMock);
  server.close();
});

const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;

describe("user handler", () => {
  test("Should create new user", async () => {
    const input = { username: "luffy123", password: "luffy123" };
    const data = {
      id: "y389yr739",
      username: input.username,
      password: input.password,
      createdAt: new Date(Date.now()),
    };

    prismaMock.user.create.mockResolvedValue(data);

    const res = await supertest(server).post("/api/signup").send(input);

    expect(res.body.message).toBe("User registered successfully");
    expect(res.status).toBe(200);
  });
});
