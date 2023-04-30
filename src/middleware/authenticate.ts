import middy from "@middy/core";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import createError from "http-errors";
import { verifyJWT } from "../utils/jwt";

export const authenticate = () => {
  const before: middy.MiddlewareFn<
    APIGatewayProxyEvent & { auth: { user: any; token: string } },
    APIGatewayProxyResult
  > = async (handler) => {
    const event = handler.event;
    const authorization = event.headers?.authorization;

    if(!authorization) {
      throw new createError.Unauthorized(
        JSON.stringify({
          message: 'Authorization header is required',
        })
      );
    }

    const token = (authorization || '').split(' ')[1];
    try {
      const result = await verifyJWT(token);
      event.auth = {
        user: result,
        token,
      };
    } catch (err) {
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
