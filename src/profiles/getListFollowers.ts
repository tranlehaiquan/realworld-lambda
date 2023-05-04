import { APIGatewayProxyResult } from "aws-lambda";
import middy from "@middy/core";
import createError from "http-errors";

import { connect } from "../data-source";
import { User } from "../entity/User";
import baseMiddlewares from "../middleware/baseMiddlewares";
import { authenticate } from "../middleware/authenticate";
import { APIGatewayProxyEventExtend } from "../interface";
import { UserToFollower } from "../entity/UserToFollower";

const middlewares = [...baseMiddlewares, authenticate({ required: false })];

// /api/profiles/{username}
const handler = async (
  event: APIGatewayProxyEventExtend
): Promise<APIGatewayProxyResult> => {
  // username
  const { username } = event.pathParameters;
  if (!username) {
    throw new createError.BadRequest("Username is required");
  }
  await connect();

  // get user
  const user = await User.findOne({
    where: {
      username,
    },
    select: ["id"],
  });

  if (!user) {
    throw new createError.NotFound("User not found");
  }

  const followers = await UserToFollower.find({
    where: {
      userId: user.id,
    },
    relations: ["follower", "user"],
  });

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ followers }),
  };
};

export const getListFollowers = middy(handler).use(middlewares);
