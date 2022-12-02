import * as yup from "yup"
import { SchemaOf } from "yup"
import { ContactCreateRequest } from "../interfaces"

export const createContactSchema: SchemaOf<ContactCreateRequest> = yup
  .object()
  .shape({
    full_name: yup.string().max(50).required(),
    emails: yup.array().of(yup.string().max(40).email()).required(),
    numbers: yup.array().of(yup.string().min(9).max(13)).required()
  })
  .required()
