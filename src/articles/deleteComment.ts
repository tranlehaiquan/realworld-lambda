import { APIGatewayProxyResult } from "aws-lambda";
import middy from "@middy/core";
import createHttpError from "http-errors";

import { connect } from "../data-source";
import baseMiddlewares from "../middleware/baseMiddlewares";
import { authenticate } from "../middleware/authenticate";
import { APIGatewayProxyEventExtend } from "../interface";
import { Comment } from "../entity/Comment";

// get type of schema body
const middlewares = [...baseMiddlewares, authenticate()];

// /api/articles/comments/{id}
const handler = async (
  event: APIGatewayProxyEventExtend
): Promise<APIGatewayProxyResult> => {
  await connect();
  const { id } = event.pathParameters;
  const auth = event.auth;
  const comment = await Comment.findOne({
    where: { id, userId: auth.user.id },
  });

  if (!comment) {
    throw new createHttpError.NotFound("Comment not found");
  }

  const result = await comment.remove();

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ result }),
  };
};

export const deleteComment = middy(handler).use(middlewares);
