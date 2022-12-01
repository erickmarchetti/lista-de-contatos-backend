import * as yup from "yup"
import { SchemaOf } from "yup"
import { UserCreateRequest } from "../interfaces"

// const userRepository = AppDataSource.getRepository(User)
// const existingNames = await userRepository.find()

export const createUserSchema: SchemaOf<UserCreateRequest> = yup
  .object()
  .shape({
    full_name: yup.string().max(50).required(),
    password: yup.string().required(),
    emails: yup.array().of(yup.string().max(40).email()).required(),
    numbers: yup.array().of(yup.string().min(9).max(13)).required()
  })
  .required()
