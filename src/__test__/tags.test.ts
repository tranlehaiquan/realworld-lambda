import { Tag } from "../entity/Tag";
import { tags } from "../tags";
import { APIGatewayProxyEvent } from "aws-lambda";

vi.mock("../entity/Tag", () => {
  return {
    Tag: {
      find: vi.fn(),
    },
  };
});

const mockEventData = {
  headers: {},
  body: {},
} as unknown as APIGatewayProxyEvent & any;
const mockContext: any = {};

describe("get tags", () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  it("Should return tags", async () => {
    (Tag.find as any).mockResolvedValueOnce([]);

    const result = await tags(mockEventData, mockContext);
    expect(result.body).equal(JSON.stringify({ tags: [] }));
  });
});
