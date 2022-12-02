import * as yup from "yup"
import { SchemaOf } from "yup"
import { ContactUpdateRequest } from "../interfaces"

export const updateContactSchema: SchemaOf<ContactUpdateRequest> = yup
  .object()
  .shape({
    full_name: yup.string().max(50),
    emails: yup.array().of(yup.string().max(40).email()),
    numbers: yup.array().of(yup.string().min(9).max(13))
  })
  .required()
