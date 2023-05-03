import { APIGatewayProxyEvent } from "aws-lambda";

export type APIGatewayProxyEventExtend = APIGatewayProxyEvent & {
  auth?: { user: any; token: string };
};
