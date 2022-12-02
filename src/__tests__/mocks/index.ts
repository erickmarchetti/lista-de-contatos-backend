import { UserCreateRequest, LoginRequest } from "../../interfaces"

export const mockedUser1: UserCreateRequest = {
  full_name: "Mocked Erick 1",
  password: "1234",
  emails: ["erick@gmail.com", "teste@gmail.com"],
  numbers: ["555555555", "1111111111111"]
}

export const mockedUser2: UserCreateRequest = {
  full_name: "Mocked Erick 2",
  password: "1234",
  emails: ["erick@gmail.com", "teste@gmail.com"],
  numbers: ["555555555", "1111111111111"]
}

export const mockedLoginUser1: LoginRequest = {
  full_name: "Mocked Erick 1",
  password: "1234"
}

export const mockedLoginUser2: LoginRequest = {
  full_name: "Mocked Erick 2",
  password: "1234"
}

export const mockedContact1 = {
  full_name: "Mocked Contact Erick 1",
  emails: ["erick@gmail.com", "teste@gmail.com"],
  numbers: ["555555555", "1111111111111"]
}
