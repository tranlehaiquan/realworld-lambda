import { APIGatewayProxyResult } from "aws-lambda";
import middy from "@middy/core";
import * as yup from "yup";
import createHttpError from "http-errors";

import { connect } from "../data-source";
import { Article } from "../entity/Article";
import { validator } from "../middleware/validator";
import baseMiddlewares from "../middleware/baseMiddlewares";
import { authenticate } from "../middleware/authenticate";
import { APIGatewayProxyEventExtend } from "../interface";
import { Comment } from "../entity/Comment";

const schema = yup.object().shape({
  body: yup.object().shape({
    body: yup.string().required("Body is required").min(20),
  }),
});

// get type of schema body
type SchemaBody = yup.InferType<typeof schema>;

const middlewares = [...baseMiddlewares, authenticate(), validator({ schema })];

// /api/articles/{slug}/comments
const handler = async (
  event: APIGatewayProxyEventExtend
): Promise<APIGatewayProxyResult> => {
  await connect();
  const auth = event.auth;

  const { slug } = event.pathParameters;
  const article = await Article.findOne({ where: { slug } });

  if (!article) {
    throw new createHttpError.NotFound("Article not found");
  }

  const newComment = new Comment();
  const { body } = event.body as SchemaBody["body"];
  newComment.body = body;
  newComment.articleId = article.id;
  newComment.userId = auth.user.id as any;

  const result = await newComment.save();

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ result }),
  };
};

export const addCommentToArticle = middy(handler).use(middlewares);
