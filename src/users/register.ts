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
    username: yup.string().required("Username is required"),
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
  const { username, password, email } = body;

  const users = await User.find({
    where: [{ username }, { email }],
  });

  if (users.length > 0) {
    throw createError.Conflict(
      JSON.stringify({
        message: `${username} or ${email} already exists!`,
      })
    );
  }

  const user = new User();

  user.username = username;
  user.email = email;
  user.setPassword(password);

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

export const register = middy(handler).use(middlewares);
