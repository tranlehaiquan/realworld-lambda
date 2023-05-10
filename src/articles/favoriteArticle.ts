import middy from "@middy/core";

import createHttpError from "http-errors";
import baseMiddlewares from "../middleware/baseMiddlewares";
import { APIGatewayProxyEventExtend } from "../interface";
import { connect } from "../data-source";
import { ArticleToFavorite } from "../entity/ArticleToFavorite";
import { Article } from "../entity/Article";
import { authenticate } from "../middleware/authenticate";

const middlewares = [...baseMiddlewares, authenticate({ required: true })];

const handler = async (event: APIGatewayProxyEventExtend) => {
  // slug
  const { slug } = event.pathParameters;
  const { auth } = event;

  await connect();

  const articleToFavorite = await ArticleToFavorite.findOne({
    where: {
      article: {
        slug,
      },
      userId: auth.user.id,
    },
  });

  const article = await Article.findOne({
    where: {
      slug,
    },
    select: ["id"],
  });

  if (!article) {
    throw new createHttpError.NotFound("Article not found");
  }

  if (!articleToFavorite) {
    const newFavorite = new ArticleToFavorite();
    newFavorite.articleId = article.id;
    newFavorite.userId = auth.user.id;
    await newFavorite.save();
  }

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      favorite: true,
    }),
  };
};

export const favoriteArticle = middy(handler).use(middlewares);
