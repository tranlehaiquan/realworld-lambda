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
import { Tag } from "../entity/Tag";

const schema = yup.object().shape({
  body: yup.object().shape({
    title: yup.string().nullable().max(100).min(10),
    description: yup.string().min(50).max(500).nullable(),
    body: yup.string().nullable().min(100).max(10000),
    tagList: yup.array().of(yup.string()).nullable(),
  }),
});

// get type of schema body
type SchemaBody = yup.InferType<typeof schema>;

const middlewares = [...baseMiddlewares, authenticate(), validator({ schema })];

const handler = async (
  event: APIGatewayProxyEventExtend
): Promise<APIGatewayProxyResult> => {
  const auth = event.auth;

  const { slug } = event.pathParameters;

  if (!slug) {
    throw new createHttpError.BadRequest("Slug is required");
  }

  await connect();

  const article = await Article.findOne({
    where: {
      slug,
    },
    loadRelationIds: true,
  });

  const { title, description, body, tagList } =
    event.body as SchemaBody["body"];

  const tags = await Tag.handleAddTags([...new Set(tagList || [])]);

  article.title = title || article.title;
  article.description = description || article.description;
  article.body = body || article.body;
  article.tagList = tagList ? (tags as any) : article.tagList;

  await article.save();

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ article }),
  };
};

export const updateArticle = middy(handler).use(middlewares);
