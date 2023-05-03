import createError from "http-errors";
import middy from "@middy/core";

import { connect } from "../data-source";
import { Article } from "../entity/Article";
import baseMiddlewares from "../middleware/baseMiddlewares";

// get article detail by slug
const handler = async (event) => {
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

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ article }),
  };
};

export const getArticleBySlug = middy(handler).use(baseMiddlewares);
