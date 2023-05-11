import middy from "@middy/core";
import baseMiddlewares from "./middleware/baseMiddlewares";
import { connect } from "./data-source";
import { Tag } from "./entity/Tag";
import { APIGatewayProxyEvent } from "aws-lambda";

const middlewares = [...baseMiddlewares];

const handler = async (event: APIGatewayProxyEvent) => {
  await connect();
  const tags = await Tag.find();

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ tags }),
  };
};

export const tags = middy(handler).use(middlewares);
