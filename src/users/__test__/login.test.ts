import { APIGatewayProxyEvent } from "aws-lambda";
import { vi, describe, afterEach, it, expect } from "vitest";
import { User } from "../../entity/User";
import { login } from "../login";
import { signJWT } from "../../utils/jwt";

vi.mock("../../entity/User", () => {
  return {
    User: {
      findUserByEmailAndPassword: vi.fn(),
    },
  };
});

vi.mock("../../utils/jwt", () => {
  return {
    signJWT: vi.fn(),
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
    vi.clearAllMocks();
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

  // should return Email or password is invalid!
  it("should return error when login fail", async () => {
    // mock User.findUserByEmailAndPassword
    (User.findUserByEmailAndPassword as any).mockResolvedValueOnce(null);

    const result = await login(mockEventData, mockContext);
    expect(result.statusCode).equal(401);
    expect(result.body).equal(
      JSON.stringify({
        message: "Email or password is invalid!",
      })
    );
  });

  // should return error when signJWT fail
  it("should return error when signJWT fail", async () => {
    // mock User.findUserByEmailAndPassword
    (User.findUserByEmailAndPassword as any).mockResolvedValueOnce({
      username: "test",
      excludeSensitiveData: () => ({
        username: "test",
      }),
    });

    (signJWT as any).mockRejectedValueOnce(new Error("Sign JWT fail"));

    const result = await login(mockEventData, mockContext);
    expect(result.statusCode).equal(401);
    console.log(result.body);
    expect(result.body).equal(
      JSON.stringify({
        message: "Sign JWT fail",
      })
    );
  });
});
