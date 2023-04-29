import * as yup from "yup";
import pick from "lodash/pick";

const fieldsValidate = {
  username: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
};

export const getBodyValidator = (fieldsName: string[]) => {
  return yup.object({
    ...pick(fieldsValidate, fieldsName),
  });
};
