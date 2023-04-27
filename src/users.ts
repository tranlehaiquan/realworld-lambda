import { APIGatewayProxyResult } from "aws-lambda";
import { QueryCommand, QueryCommandInput } from "@aws-sdk/client-dynamodb";
import { AppDataSource } from "./data-source";
import { User } from "./entity/User";

// POST signIn
export const signIn = async (): Promise<APIGatewayProxyResult> => {
  // pull all record from the table users
  await AppDataSource.initialize();
  const user = await AppDataSource.manager.find(User);
  console.log(user);
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(
      {
        message: "SignIn",
      },
      null,
      2
    ),
  };
};

// POST signUp
export const signUp = async (): Promise<APIGatewayProxyResult> => {
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(
      {
        message: "SignUp",
      },
      null,
      2
    ),
  };
};

// GET whoAmI
export const whoAmI = async (): Promise<APIGatewayProxyResult> => {
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(
      {
        message: "WhoAmI",
      },
      null,
      2
    ),
  };
};

// PUT user
export const updateUser = async (): Promise<APIGatewayProxyResult> => {
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(
      {
        message: "UpdateCurrentUser",
      },
      null,
      2
    ),
  };
};
