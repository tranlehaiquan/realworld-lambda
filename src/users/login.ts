import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import middy from "@middy/core";
import * as yup from "yup";
import createError from "http-errors";

import { connect } from "../data-source";
import { User } from "../entity/User";
import { validator } from "../middleware/validator";
import { signJWT } from "../utils/jwt";
import baseMiddlewares from "../middleware/baseMiddlewares";
import { getSchemaByFields } from "../yup/getSchema";

const schema = yup.object().shape({
  body: getSchemaByFields(["password", "email"]),
});

const middlewares = [
  ...baseMiddlewares,
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
    throw createError.Unauthorized(
      JSON.stringify({
        message: "Email or password is invalid!",
      })
    );
  }

  try {
    const token = await signJWT(user.excludeSensitiveData());
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
      }),
    };
  } catch (err) {
    throw createError.Unauthorized(
      JSON.stringify({
        message: err.message,
      })
    );
  }
};

export const login = middy(handler).use(middlewares);
