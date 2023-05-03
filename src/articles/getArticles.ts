import middy from "@middy/core";

import { connect } from "../data-source";
import baseMiddlewares from "../middleware/baseMiddlewares";
import { authenticate } from "../middleware/authenticate";
import { APIGatewayProxyEventExtend } from "../interface";
import { APIGatewayProxyResult } from "aws-lambda";
import { Article } from "../entity/Article";
import { ArrayContains } from "typeorm";

const middlewares = [...baseMiddlewares, authenticate({ required: false })];

// get article detail by slug
const handler = async (
  event: APIGatewayProxyEventExtend
): Promise<APIGatewayProxyResult> => {
  const { queryStringParameters } = event;
  const { author, tag, limit = 20, offset = 0 } = queryStringParameters;

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

export const getArticles = middy(handler).use(middlewares);
