import { APIGatewayProxyResult } from "aws-lambda";
import middy from "@middy/core";
import * as yup from "yup";
import createError from "http-errors";

import { connect } from "../data-source";
import { User } from "../entity/User";
import baseMiddlewares from "../middleware/baseMiddlewares";
import { authenticate } from "../middleware/authenticate";
import { APIGatewayProxyEventExtend } from "../interface";

const middlewares = [...baseMiddlewares, authenticate({ required: false })];

// /api/profiles/{username}
const handler = async (
  event: APIGatewayProxyEventExtend
): Promise<APIGatewayProxyResult> => {
  const auth = event.auth;
  // get username
  const { username } = event.pathParameters;
  if (!username) {
    throw new createError.BadRequest("Username is required");
  }

  // get user
  await connect();
  const user = await User.findOneBy({
    username,
  });
  const test = await User.findOne({
    where: { username },
    relations: ["followers"],
  });
  console.log(test);

  if (!user) {
    throw new createError.NotFound("User not found");
  }

  let isFollowing = false;
  // check if user is authenticated
  if (auth) {
    // check if user is following
    const follower = await User.findOneBy({
      username,
      followers: { id: user.id },
    });

    if (follower) {
      isFollowing = true;
    }
  }

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...user.excludeSensitiveData(), isFollowing }),
  };
};

export const getProfile = middy(handler).use(middlewares);
