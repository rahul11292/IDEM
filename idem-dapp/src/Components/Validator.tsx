import { UserLogin, UserSignUp } from "./Authentication/Authentication";
import Joi from "Joi";
type Error = { [key: string]: string } | null;

export function validatorUserLogin(user: UserLogin["account"]) {
  if (
    !Joi.number()
      .integer()
      .min(1000000000)
      .max(9999999999)
      .validate(Number(user.emailOrNumber)).value
  ) {
    const schemaUserLogin = Joi.object({
      emailOrNumber: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .label("Email"),
      password: Joi.string().min(5).required(),
    });
    const validate = schemaUserLogin.validate(user);
    if (!validate.error) {
      return { error: null, entryEmail: true };
    } else {
      const error: Error = {};
      validate.error.details.map((item) => {
        return (error[item.path[0] as keyof typeof error] = item.message);
      });
      return { error, entryEmail: true };
    }
  } else {
    const schemaUserLogin = Joi.object({
      emailOrNumber: Joi.number()
        .integer()
        .min(1000000000)
        .max(9999999999)
        .required()
        .label("Phone Number")
        .messages({
          "number.min": `Must be valid phone number`,
          "number.max": `Must be valid phone number`,
        }),
      password: Joi.string().min(5).required(),
    });
    const validate = schemaUserLogin.validate(user);
    if (!validate.error) return { error: null, entryEmail: false };
    const error: Error = {};

    validate.error.details.map((item) => {
      return (error[item.path[0] as keyof typeof error] = item.message);
    });
    return { error, entryEmail: false };
  }
}

export function validatorUserSignup(user: UserSignUp["account"]) {
  if (
    !Joi.number()
      .integer()
      .min(1000000000)
      .max(9999999999)
      .validate(Number(user.emailOrNumber)).value
  ) {
    const schemaUserLogin = Joi.object({
      name: Joi.string().required(),
      emailOrNumber: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .label("Email"),
      password: Joi.string().min(5).required(),
    });
    const validate = schemaUserLogin.validate(user);
    if (!validate.error) {
      return { error: null, entryEmail: true };
    } else {
      const error: Error = {};
      validate.error.details.map((item) => {
        return (error[item.path[0] as keyof typeof error] = item.message);
      });
      return { error, entryEmail: true };
    }
  } else {
    const schemaUserLogin = Joi.object({
      name: Joi.string().required(),
      emailOrNumber: Joi.number()
        .integer()
        .min(1000000000)
        .max(9999999999)
        .required()
        .label("Phone Number")
        .messages({
          "number.min": `Must be valid phone number`,
          "number.max": `Must be valid phone number`,
        }),
      password: Joi.string().min(5).required(),
    });
    const validate = schemaUserLogin.validate(user);
    if (!validate.error) return { error: null, entryEmail: false };
    const error: Error = {};

    validate.error.details.map((item) => {
      return (error[item.path[0] as keyof typeof error] = item.message);
    });
    return { error, entryEmail: false };
  }
}
