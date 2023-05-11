import pick from "lodash/pick";
import * as yup from "yup";

const fields = {
  username: yup.string().required("Username is required"),
  email: yup
    .string()
    .email("Email must be a valid email")
    .required("Email is required"),
  password: yup.string().required("Password is required").min(8),
  id: yup.string().required("Id is required"),
  bio: yup.string(),
  image: yup.string().url(),
};

export const getSchemaByFields = (fieldNames: string[]) => {
  const pickFields = pick(fields, fieldNames);

  return yup.object().shape({
    ...pickFields,
  });
};
