import { APIGatewayProxyEvent } from "aws-lambda";
import { vi, describe, afterEach, it, expect } from "vitest";
import { User } from "../../entity/User";
import { login } from "../login";

// mock database connect
vi.mock("../../data-source", () => {
  return {
    connect: vi.fn(),
  };
});

vi.mock("../../entity/User", () => {
  return {
    User: {
      findUserByEmailAndPassword: vi.fn(),
    },
  };
});

const mockEventData = {
  headers: {},
  body: {
    email: "test@gmail.com",
    password: "12345678",
  },
} as unknown as APIGatewayProxyEvent & any;

const mockContext: any = {};

describe("login", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it("body validation should fail with invalid email", async () => {
    const event1 = {
      headers: {},
      body: {
        email: "test",
        password: "123456789",
      },
    };

    const result = await login(event1 as any, mockContext);
    expect(result.statusCode).toBe(400);
    expect(result.body).toBe(
      '{"message":"Email must be a valid email","errors":["Email must be a valid email"]}'
    );
  });

  it("body validation should fail with invalid password", async () => {
    const event = {
      headers: {},
      body: {
        email: "test@gmail.com",
        password: "1234567",
      },
    };

    const result = await login(event as any, mockContext);
    expect(result.statusCode).toBe(400);
    expect(result.body).toBe(
      '{"message":"body.password must be at least 8 characters","errors":["body.password must be at least 8 characters"]}'
    );
  });

  it("should return token when success login", async () => {
    // mock User.findUserByEmailAndPassword
    (User.findUserByEmailAndPassword as any).mockResolvedValueOnce({
      username: "test",
      excludeSensitiveData: () => ({
        username: "test",
      }),
    });

    const result = await login(mockEventData, mockContext);
    expect(result.statusCode).equal(200);
  });
});
