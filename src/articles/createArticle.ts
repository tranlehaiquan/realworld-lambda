import { APIGatewayProxyResult } from "aws-lambda";
import middy from "@middy/core";
import * as yup from "yup";

import { connect } from "../data-source";
import { Article } from "../entity/Article";
import { validator } from "../middleware/validator";
import baseMiddlewares from "../middleware/baseMiddlewares";
import { authenticate } from "../middleware/authenticate";
import { APIGatewayProxyEventExtend } from "../interface";
import { Tag } from "../entity/Tag";
import { In } from "typeorm";

const schema = yup.object().shape({
  body: yup.object().shape({
    title: yup.string().required("Title is required").max(100),
    description: yup.string().required("Description is required").max(500),
    body: yup.string().required("Body is required"),
    tagList: yup.array().of(yup.string()),
  }),
});

// get type of schema body
type SchemaBody = yup.InferType<typeof schema>;

const middlewares = [...baseMiddlewares, authenticate(), validator({ schema })];

const handler = async (
  event: APIGatewayProxyEventExtend
): Promise<APIGatewayProxyResult> => {
  await connect();
  const auth = event.auth;

  const newArticle = new Article();
  const { title, description, body, tagList } =
    event.body as SchemaBody["body"];

  const tags = await Tag.handleAddTags([...new Set(tagList || [])]);

  newArticle.title = title;
  newArticle.description = description;
  newArticle.body = body;
  newArticle.tagList = tags as any;
  newArticle.author = { id: auth.user.id } as any;

  const result = await newArticle.save();

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ result }),
  };
};

export const createArticle = middy(handler).use(middlewares);
