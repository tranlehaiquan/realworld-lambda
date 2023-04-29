import { APIGatewayProxyResult, APIGatewayProxyEvent } from "aws-lambda";
import { AppDataSource } from "./data-source";
import { User } from "./entity/User";
import { getBodyValidator } from "./bodyValidator";

// POST signIn
export const signIn = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const body = JSON.parse(event.body);

};

// POST signUp
export const signUp = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  // validate body
  // check if username exists or not
  // create a new user
  const body = JSON.parse(event.body);
  const validator = getBodyValidator(["username", "email", "password"]);

  if (!(await validator.isValid(body))) {
    const bodyValidate = await validator.validate(body);
    return {
      statusCode: 400,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyValidate, null, 2),
    };
  }

  // pull all record from the table users
  await AppDataSource.initialize();
  const { username, password, email } = body;
  const user = new User();
  user.username = username;
  user.email = email;
  user.setPassword(password);
  // save
  await user.save();

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
