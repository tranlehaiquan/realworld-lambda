import { APIGatewayProxyResult } from "aws-lambda";
import middy from "@middy/core";
import createHttpError from "http-errors";

import { connect } from "../data-source";
import { Article } from "../entity/Article";
import baseMiddlewares from "../middleware/baseMiddlewares";
import { authenticate } from "../middleware/authenticate";
import { APIGatewayProxyEventExtend } from "../interface";

const middlewares = [...baseMiddlewares, authenticate()];

const handler = async (
  event: APIGatewayProxyEventExtend
): Promise<APIGatewayProxyResult> => {
  const auth = event.auth;
  const currentUser = auth.user;

  const { slug } = event.pathParameters;

  if (!slug) {
    throw new createHttpError.BadRequest("Slug is required");
  }

  await connect();
  const article = await Article.findOne({
    where: {
      slug,
    },
    loadRelationIds: {
      relations: ["author"],
    }
  });

  if (!article) {
    throw new createHttpError.NotFound("Article not found");
  }

  if (article.author !== currentUser.id) {
    throw new createHttpError.Forbidden("You are not author of this article");
  }

  // delete
  await article.remove();

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      success: true,
    }),
  };
};

export const deleteArticle = middy(handler).use(middlewares);
