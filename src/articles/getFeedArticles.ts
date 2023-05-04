import middy from "@middy/core";
import { In } from "typeorm";
import { APIGatewayProxyResult } from "aws-lambda";

import { connect } from "../data-source";
import baseMiddlewares from "../middleware/baseMiddlewares";
import { authenticate } from "../middleware/authenticate";
import { APIGatewayProxyEventExtend } from "../interface";
import { Article } from "../entity/Article";
import { User } from "../entity/User";
import { UserToFollower } from "../entity/UserToFollower";

const middlewares = [...baseMiddlewares, authenticate({ required: true })];

// get article detail by slug
const handler = async (
  event: APIGatewayProxyEventExtend
): Promise<APIGatewayProxyResult> => {
  const { auth } = event;
  const { user } = auth;
  const { queryStringParameters } = event;
  const { limit = 20, offset = 0 } = queryStringParameters || {};
  await connect();

  // get all users that auth.user follow
  const followers = (
    await UserToFollower.find({
      where: {
        followerId: user.id,
      },
      select: ["userId"],
    })
  ).map((item) => item.userId);

  // get article where author = author
  const articles = await Article.find({
    where: {
      // author is in followers
      author: {
        id: In(followers),
      },
    },
    take: Number(limit),
    skip: Number(offset),
    loadRelationIds: true,
  });

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      articles,
      count: articles.length,
    }),
  };
};

export const getFeedArticles = middy(handler).use(middlewares);
