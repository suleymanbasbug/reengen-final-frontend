import { required, minLength, helpers, email } from "vuelidate/lib/validators";

const noNumeric = helpers.regex(/^[a-zA-Z]*$/);
const password = helpers.regex(
  /^(?=.{6,32}$)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*/
);

export default {
  validations: {
    name: {
      required,
      minLength: minLength(8),
      noNumeric,
    },
    email: {
      required,
      minLength: minLength(8),
      email,
    },
    password: {
      required,
      minLength: minLength(6),
      password,
    },
    isAdmin: {
      required,
    },
  },
};
