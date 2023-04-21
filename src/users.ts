import { APIGatewayProxyResult } from "aws-lambda";

// POST signIn
export const signIn = async (): Promise<APIGatewayProxyResult> => {
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json"
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
      "Content-Type": "application/json"
    },
    body: JSON.stringify(
      {
        message: "SignUp",
      },
      null,
      2
    ),
  };
}

// GET whoAmI
export const whoAmI = async (): Promise<APIGatewayProxyResult> => {
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(
      {
        message: "WhoAmI",
      },
      null,
      2
    ),
  };
}

// PUT user
export const updateUser = async (): Promise<APIGatewayProxyResult> => {
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(
      {
        message: "UpdateCurrentUser",
      },
      null,
      2
    ),
  };
}

