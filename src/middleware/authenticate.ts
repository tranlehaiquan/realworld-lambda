import middy from "@middy/core";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import createError from "http-errors";
import { verifyJWT } from "../utils/jwt";

type Options = {
  required: boolean;
};

export const authenticate = (options: Options = { required: true }) => {
  const { required } = options;
  const before: middy.MiddlewareFn<
    APIGatewayProxyEvent & { auth: { user: any; token: string } },
    APIGatewayProxyResult
  > = async (handler) => {
    const event = handler.event;
    const authorization = event.headers?.authorization;

    if (!authorization && required) {
      throw new createError.Unauthorized(
        JSON.stringify({
          message: "Authorization header is required",
        })
      );
    }

    const token = (authorization || "").split(" ")[1];
    try {
      const result = await verifyJWT(token);
      event.auth = {
        user: result,
        token,
      };
    } catch (err) {
      if (!required) {
        return;
      }

      const error = new createError.Unauthorized(
        JSON.stringify({
          message: err.message,
        })
      );
      error.details = err.message;

      throw error;
    }
  };

  return {
    before,
  };
};
