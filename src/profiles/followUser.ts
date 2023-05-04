import { APIGatewayProxyResult } from "aws-lambda";
import middy from "@middy/core";
import createError from "http-errors";

import { connect } from "../data-source";
import { User } from "../entity/User";
import baseMiddlewares from "../middleware/baseMiddlewares";
import { authenticate } from "../middleware/authenticate";
import { APIGatewayProxyEventExtend } from "../interface";
import { UserToFollower } from "../entity/UserToFollower";

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
  const userDetail = await User.findOne({
    where: { id: auth.user.id },
  });

  const profilesTarget = await User.findOne({
    where: {
      username,
    },
  });

  if (!profilesTarget) {
    throw new createError.NotFound("User not found");
  }

  const newUserToFollower = UserToFollower.create({
    user: profilesTarget,
    follower: userDetail,
  });

  await newUserToFollower.save();

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      isFollowing: true,
    }),
  };
};

export const followUser = middy(handler).use(middlewares);
