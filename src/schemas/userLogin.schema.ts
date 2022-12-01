import * as yup from "yup"
import { SchemaOf } from "yup"
import { LoginRequest } from "../interfaces"

export const userLoginSchema: SchemaOf<LoginRequest> = yup
  .object()
  .shape({
    full_name: yup.string().max(50).required(),
    password: yup.string().required()
  })
  .required()
