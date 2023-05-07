import middy from "@middy/core";

import { connect } from "../data-source";
import baseMiddlewares from "../middleware/baseMiddlewares";
import { authenticate } from "../middleware/authenticate";
import { APIGatewayProxyEventExtend } from "../interface";
import { APIGatewayProxyResult } from "aws-lambda";
import { Article } from "../entity/Article";
import { ArrayContains, In } from "typeorm";
import { ArticleToFavorite } from "../entity/ArticleToFavorite";
import keyBy from "lodash/keyBy";

const middlewares = [...baseMiddlewares, authenticate({ required: false })];

// get article detail by slug
const handler = async (
  event: APIGatewayProxyEventExtend
): Promise<APIGatewayProxyResult> => {
  const { queryStringParameters } = event;
  const { author, tag, limit = 20, offset = 0 } = queryStringParameters || {};

  const tags = tag ? tag.split(",") : [];
  await connect();
  // get article where author = author
  const articles = await Article.find({
    where: {
      author: {
        id: author as any,
      },
      tagList: ArrayContains(tags),
    },
    take: Number(limit),
    skip: Number(offset),
    loadRelationIds: true,
  });

  if (!event.auth?.user) {
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
  }

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

export const getArticles = middy(handler).use(middlewares);
