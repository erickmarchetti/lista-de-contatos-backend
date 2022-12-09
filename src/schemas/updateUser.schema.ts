import * as yup from "yup"
import { SchemaOf } from "yup"
import { UserUpdateRequest } from "../interfaces"

export const updateUserSchema: SchemaOf<UserUpdateRequest> = yup
  .object()
  .shape({
    full_name: yup.string().max(50),
    password: yup.string(),
    emails: yup.array().of(yup.string().max(40).email()),
    numbers: yup.array().of(
      yup
        .string()
        .min(9)
        .max(13)
        .matches(/^[0-9]+$/, "This field must have only numbers")
    )
  })
  .required()
