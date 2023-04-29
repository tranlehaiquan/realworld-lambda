import * as yup from "yup";
import createError from 'http-errors';
import pick from "lodash/pick";

export const schema = yup.object().shape({
  username: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required()
});


(async () => {
  try {
    const a = await schema.validate({
      username: "jimmy",
      email: "11"
    }, {
      strict: true,
      abortEarly: false
    })
  } catch(err) {
    const error = createError.BadRequest(JSON.stringify({
      ...pick(err, ['message', 'errors'])
    }));
    console.log(JSON.stringify(error));
  }

})()