export interface UserCreateRequest {
  full_name: string
  password: string
  numbers: string[]
  emails: string[]
}

export interface UserUpdateRequest {
  full_name?: string
  password?: string
  numbers?: string[]
  emails?: string[]
}

export interface LoginRequest {
  full_name: string
  password: string
}

export interface LoginResponse {
  token: string
  id: string
}

export interface ContactCreateRequest {
  full_name: string
  numbers: string[]
  emails: string[]
}

export interface ContactUpdateRequest {
  full_name?: string
  numbers?: string[]
  emails?: string[]
}

export interface IContact {
  id: string
  full_name: string
  numbers: string[]
  emails: string[]
}
