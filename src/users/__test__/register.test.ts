import { APIGatewayProxyEvent } from "aws-lambda";
import { User } from "../../entity/User";
import { register } from "../register";

const mockContext: any = {};

describe("Register a user", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("validate the request body", async () => {
    const event = {
      headers: {},
      body: {
        username: "test",
        password: "12345678",
        email: "test",
      },
    };

    const response = await register(event as any, mockContext);
    expect(response.statusCode).toEqual(400);

    const event1 = {
      headers: {},
      body: {
        username: "test",
        password: "1234567",
        email: "test@gmail.com",
      },
    };
    const response1 = await register(event1 as any, mockContext);
    expect(response1.statusCode).toEqual(400);

    const event2 = {
      headers: {},
      body: {
        username: "",
        password: "12345678",
        email: "test@gmail.com",
      },
    };
    const response2 = await register(event2 as any, mockContext);
    expect(response2.statusCode).toEqual(400);
  });

  it("Should return 409 if user already exists", async () => {
    // mock User.find
    (User.find as any).mockResolvedValue([
      {
        username: "test",
      },
    ]);

    const mockEventData = {
      headers: {},
      body: {
        username: "test",
        password: "12345678",
        email: "test@gmail.com",
      },
    } as unknown as APIGatewayProxyEvent & any;

    const result = await register(mockEventData, mockContext);
    expect(result.statusCode).toBe(409);
  });

  it("Should return 200 if register success", async () => {
    // mock User.find
    (User.find as any).mockResolvedValue([]);

    const mockEventData = {
      headers: {},
      body: {
        username: "test",
        password: "12345678",
        email: "test@gmail.com",
      },
    } as unknown as APIGatewayProxyEvent & any;

    const result = await register(mockEventData, mockContext);
    expect(result.statusCode).toBe(200);
  });
});
