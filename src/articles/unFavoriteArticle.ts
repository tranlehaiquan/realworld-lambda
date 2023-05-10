import middy from "@middy/core";
import baseMiddlewares from "../middleware/baseMiddlewares";
import { APIGatewayProxyEventExtend } from "../interface";
import { connect } from "../data-source";
import { ArticleToFavorite } from "../entity/ArticleToFavorite";
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

  if (articleToFavorite) {
    await articleToFavorite.remove();
  }

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      favorite: false,
    }),
  };
};

export const unFavoriteArticle = middy(handler).use(middlewares);
