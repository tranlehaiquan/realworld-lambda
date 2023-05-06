import middy from "@middy/core";
import baseMiddlewares from "../middleware/baseMiddlewares";
import { connect } from "../data-source";
import { authenticate } from "../middleware/authenticate";
import { APIGatewayProxyEventExtend } from "../interface";
import { Comment } from "../entity/Comment";

const middlewares = [...baseMiddlewares, authenticate()];

const handler = async (event: APIGatewayProxyEventExtend) => {
  await connect();

  const { slug } = event.pathParameters;
  const comments = await Comment.find({ where: { article: { slug } } });

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comments),
  };
};

export const getCommentsFromArticle = middy(handler).use(middlewares);
