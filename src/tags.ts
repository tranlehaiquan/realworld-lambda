import middy from "@middy/core";
import baseMiddlewares from "./middleware/baseMiddlewares";
import { connect } from "./data-source";
import { Tag } from "./entity/Tag";

const middlewares = [...baseMiddlewares];

const handler = async () => {
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
