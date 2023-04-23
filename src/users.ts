import { APIGatewayProxyResult } from "aws-lambda";
import { QueryCommand, QueryCommandInput } from "@aws-sdk/client-dynamodb";
import { getDynamodbClient, userTable } from "./dynamodb";

// POST signIn
export const signIn = async (): Promise<APIGatewayProxyResult> => {
  const dynamodbClient = getDynamodbClient();

  const params: QueryCommandInput = {
    TableName: userTable,
    KeyConditionExpression: "username = :username",
    ExpressionAttributeValues: {
      ":username": { S: "test2" },
    },
  };
  const command = new QueryCommand(params);
  const result = await dynamodbClient.send(command);
  // pull all record from the table users

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(
      {
        message: "SignIn",
        data: result,
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
