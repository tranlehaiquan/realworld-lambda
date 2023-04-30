import middy from "@middy/core";
import * as yup from "yup";
import pick from "lodash/pick";

import { authenticate } from "../middleware/authenticate";
import { User } from "../entity/User";
import { connect } from "../data-source";
import baseMiddlewares from "../middleware/baseMiddlewares";
import { getSchemaByFields } from "../yup/getSchema";
import { validator } from "../middleware/validator";

const schema = yup.object().shape({
  body: getSchemaByFields(["bio"]),
});

const middlewares = [...baseMiddlewares, authenticate(), validator({ schema })];

const handler = async (event) => {
  const { auth } = event;
  const { user } = auth;
  await connect();
  await User.update({ id: user.id }, pick(event.body, ["bio", "image"]));
  const userDetail = await User.findOneBy({ id: user.id });

  return {
    statusCode: 200,
    body: JSON.stringify(userDetail.excludeSensitiveData()),
  };
};

export const updateUser = middy(handler).use(middlewares);
