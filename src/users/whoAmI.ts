import middy from "@middy/core";

import { authenticate } from "../middleware/authenticate";
import { User } from "../entity/User";
import { connect } from "../data-source";
import baseMiddlewares from "../middleware/baseMiddlewares";

const middlewares = [...baseMiddlewares, authenticate()];

const handler = async (event) => {
  const { auth } = event;
  const { user } = auth;
  await connect();
  const userDetail = await User.findOneBy({ id: user.id });

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...userDetail.excludeSensitiveData(),
    }),
  };
};

export const whoAmI = middy(handler).use(middlewares);
