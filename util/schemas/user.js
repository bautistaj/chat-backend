const joi = require('@hapi/joi');

const userIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}/);
const userNameAppSchema = joi.string().max(80);
const userNameSchema = joi.string().min(1);
const middleNameSchema = joi.string().min(1);
const birthdaySchema = joi.date();
const emailSchema = joi.string().email();
const telephoneSchema = joi.string().min(10);

const createUserSchema = {
  userName: userNameAppSchema.required(), 
  name: userNameSchema.required(),  
  middleName: middleNameSchema.required(),  
  birthday: birthdaySchema.required(),  
  email: emailSchema.required(),
  telephone: telephoneSchema.required(),
  password: joi.string(),
  isAdmin: joi.boolean(),
};

const updateUserSchema = {
  userName: userNameAppSchema,
  name: userNameSchema,
  middleName: middleNameSchema,
  birthday: birthdaySchema,
  email: emailSchema,
  telephone: telephoneSchema,
  password: joi.string(),
  isAdmin: joi.boolean(),
};

module.exports = {
  userIdSchema,
  createUserSchema,
  updateUserSchema
}