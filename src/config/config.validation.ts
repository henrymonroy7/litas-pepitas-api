import * as Joi from "joi";

export const envConfigSchema = Joi.object({
  DB_HOST: Joi.string().empty().required(),
  DB_PORT: Joi.number().empty("").default(5432),
  DB_NAME: Joi.string().empty().required(),
  DB_USER: Joi.string().empty().required(),
  DB_PASS: Joi.string().empty().required(),
});
