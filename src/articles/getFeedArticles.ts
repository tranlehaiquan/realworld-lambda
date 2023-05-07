import middy from "@middy/core";
import { In } from "typeorm";
import { APIGatewayProxyResult } from "aws-lambda";

import { connect } from "../data-source";
import baseMiddlewares from "../middleware/baseMiddlewares";
import { authenticate } from "../middleware/authenticate";
import { APIGatewayProxyEventExtend } from "../interface";
import { Article } from "../entity/Article";
import { UserToFollower } from "../entity/UserToFollower";
import keyBy from "lodash/keyBy";
import { ArticleToFavorite } from "../entity/ArticleToFavorite";

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

  const articleIds = articles.map((article) => article.id);
  // find favorite article
  const favoriteArticles = keyBy(
    await ArticleToFavorite.find({
      where: {
        articleId: In(articleIds),
        userId: event.auth?.user?.id,
      },
    }),
    "articleId"
  );
  const articleWithFavorite = articles.map((article) => {
    const favorite = favoriteArticles[article.id];

    return {
      ...article,
      favorite: !!favorite,
    };
  });

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      articles: articleWithFavorite,
      count: articles.length,
    }),
  };
};

export const getFeedArticles = middy(handler).use(middlewares);
