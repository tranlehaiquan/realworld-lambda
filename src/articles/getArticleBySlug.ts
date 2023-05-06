import createError from "http-errors";
import middy from "@middy/core";

import { connect } from "../data-source";
import { Article } from "../entity/Article";
import baseMiddlewares from "../middleware/baseMiddlewares";
import { authenticate } from "../middleware/authenticate";
import { ArticleToFavorite } from "../entity/ArticleToFavorite";

const middlewares = [...baseMiddlewares, authenticate({ required: false })];

// get article detail by slug
const handler = async (event) => {
  const { auth } = event;
  const slug = event.pathParameters.slug;
  if (!slug) {
    throw new createError.BadRequest("Slug is required");
  }

  await connect();
  const article = await Article.findOne({
    where: { slug },
    relations: { author: true },
  });

  if (!article) {
    throw new createError.NotFound("Article not found");
  }

  let favorite = false;

  if (auth && auth.user) {
    const articleToFavorite = await ArticleToFavorite.findOne({
      where: {
        articleId: article.id,
        userId: auth.user.id,
      },
    });

    if (articleToFavorite) {
      favorite = true;
    }
  }

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...article, favorite }),
  };
};

export const getArticleBySlug = middy(handler).use(middlewares);
