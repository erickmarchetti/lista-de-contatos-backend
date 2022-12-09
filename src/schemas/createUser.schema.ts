import * as yup from "yup"
import { SchemaOf } from "yup"
import { UserCreateRequest } from "../interfaces"

export const createUserSchema: SchemaOf<UserCreateRequest> = yup
  .object()
  .shape({
    full_name: yup.string().max(50).required(),
    password: yup.string().required(),
    emails: yup.array().of(yup.string().max(40).email()).required(),
    numbers: yup
      .array()
      .of(
        yup
          .string()
          .min(9)
          .max(13)
          .matches(/^[0-9]+$/, "This field must have only numbers")
      )
      .required()
  })
  .required()
