import { APIGatewayProxyResult } from "aws-lambda";
import middy from "@middy/core";
import * as yup from "yup";
import createError from "http-errors";

import { connect } from "../data-source";
import { User } from "../entity/User";
import baseMiddlewares from "../middleware/baseMiddlewares";
import { authenticate } from "../middleware/authenticate";
import { APIGatewayProxyEventExtend } from "../interface";

const middlewares = [...baseMiddlewares, authenticate({ required: true })];

// /api/profiles/{username}/follow
const handler = async (
  event: APIGatewayProxyEventExtend
): Promise<APIGatewayProxyResult> => {
  const auth = event.auth;
  // get username
  const { username } = event.pathParameters;
  if (!username) {
    throw new createError.BadRequest("Username is required");
  }

  await connect();
  const user = await User.findOne({
    where: { username },
    relations: {
      followers: true,
    }
  });

  if (!user) {
    throw new createError.NotFound("User not found");
  }

  // unFollow
  user.followers = user.followers.filter(
    (follower) => follower.id !== auth.user.id
  );
  await user.save();

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...user.excludeSensitiveData(),
      isFollowing: false,
    }),
  };
};

export const unFollowUser = middy(handler).use(middlewares);
