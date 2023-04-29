import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import jsonBodyParser from "@middy/http-json-body-parser";
import * as yup from "yup";
import createError from "http-errors";

import { connect } from "../data-source";
import { User } from "../entity/User";
import { validator } from "../middleware/validator";

const schema = yup.object().shape({
  body: yup.object().shape({
    email: yup
      .string()
      .email("Email must be a valid email")
      .required("Email is required"),
    password: yup.string().required("Password is required"),
  }),
});

const middlewares = [
  httpErrorHandler(),
  jsonBodyParser(),
  validator({
    schema,
  }),
];

const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const { body }: any = event;
  await connect();
  const { password, email } = body;
  const user = await User.findUserByEmailAndPassword(email, password);

  if (!user) {
    throw createError.Unauthorized(JSON.stringify({
      message: "Email or password is invalid!",
    }));
  }

  try {
    await user.save();
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user.excludeSensitiveData()),
    };
  } catch (err) {
    throw createError.UnprocessableEntity("Something went wrong!");
  }
};

export const login = middy(handler).use(middlewares);
