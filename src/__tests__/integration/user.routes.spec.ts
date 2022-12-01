import { DataSource } from "typeorm"
import AppDataSource from "../../data-source"
import request from "supertest"
import app from "../../app"
import {
  mockedUser1,
  mockedUser2,
  mockedLoginUser1,
  mockedLoginUser2
} from "../mocks"
import { LoginResponse, UserUpdateRequest } from "../../interfaces"

let loginResponseUser1: LoginResponse
let loginResponseUser2: LoginResponse

describe("Tests Users routes", () => {
  let connection: DataSource

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((resp) => {
        connection = resp
      })
      .catch((error) => {
        console.error("Error during Data Source initialization", error)
      })

    await request(app).post("/api/users/").send(mockedUser2)
    loginResponseUser2 = await request(app)
      .post("/api/login/")
      .send(mockedLoginUser2)
      .then((res) => res.body)
  })

  afterAll(async () => {
    await connection.destroy()
  })

  test("POST /api/users/ - it should be possible to create a user", async () => {
    const response_400 = await request(app).post("/api/users/").send({
      full_name: 1,
      numbers: "",
      emails: "",
      password: 1
    })

    expect(response_400.status).toBe(400)

    const response_201 = await request(app)
      .post("/api/users/")
      .send(mockedUser1)

    loginResponseUser1 = await request(app)
      .post("/api/login/")
      .send(mockedLoginUser1)
      .then((res) => res.body)

    expect(response_201.body).toHaveProperty("id")
    expect(response_201.body).not.toHaveProperty("password")
    expect(response_201.body.full_name).toEqual(mockedUser1.full_name)

    response_201.body.numbers.map((item: { number: string }) =>
      expect(mockedUser1.numbers).toContain(item.number)
    )
    response_201.body.emails.map((item: { email: string }) =>
      expect(mockedUser1.emails).toContain(item.email)
    )
  })

  test("GET /api/users/:id/ - it should be possible to search for a user", async () => {
    const response_404 = await request(app)
      .get(`/api/users/9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d/`)
      .set("Authorization", `Bearer ${loginResponseUser1.token}`)

    expect(response_404.status).toBe(404)
    expect(response_404.body.message).toEqual("User not found")

    const response_400 = await request(app)
      .get(`/api/users/${loginResponseUser1.id}/`)
      .set("Authorization", `Bearer teste`)

    expect(response_400.status).toBe(400)
    expect(response_400.body.message).toEqual("Invalid token")

    const response_401 = await request(app)
      .get(`/api/users/${loginResponseUser1.id}/`)
      .set("Authorization", `Bearer ${loginResponseUser2.token}`)

    expect(response_401.status).toBe(401)
    expect(response_401.body.message).toEqual(
      "A user cannot interfere with another"
    )

    const response_200 = await request(app)
      .get(`/api/users/${loginResponseUser1.id}/`)
      .set("Authorization", `Bearer ${loginResponseUser1.token}`)

    expect(response_200.status).toBe(200)
    expect(response_200.body).toHaveProperty("id")
    expect(response_200.body).not.toHaveProperty("password")
    expect(response_200.body.full_name).toEqual(mockedUser1.full_name)

    response_200.body.numbers.map((item: { number: string }) =>
      expect(mockedUser1.numbers).toContain(item.number)
    )
    response_200.body.emails.map((item: { email: string }) =>
      expect(mockedUser1.emails).toContain(item.email)
    )
  })

  test("PATCH /api/users/:id/ - user must be able to update data", async () => {
    const new_data: UserUpdateRequest = {
      full_name: "teste update",
      emails: ["teste_update@gmail.com"],
      numbers: ["666666666"]
    }

    const response_400_1 = await request(app)
      .patch(`/api/users/${loginResponseUser1.id}/`)
      .set("Authorization", `Bearer ${loginResponseUser1.token}`)
      .send({
        full_name: 1,
        numbers: "",
        emails: "",
        password: 1
      })

    expect(response_400_1.status).toBe(400)

    const response_404 = await request(app)
      .patch(`/api/users/9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d/`)
      .set("Authorization", `Bearer ${loginResponseUser1.token}`)
      .send(new_data)

    expect(response_404.status).toBe(404)
    expect(response_404.body.message).toEqual("User not found")

    const response_400_2 = await request(app)
      .patch(`/api/users/${loginResponseUser1.id}/`)
      .set("Authorization", `Bearer teste`)
      .send(new_data)

    expect(response_400_2.status).toBe(400)
    expect(response_400_2.body.message).toEqual("Invalid token")

    const response_401 = await request(app)
      .patch(`/api/users/${loginResponseUser1.id}/`)
      .set("Authorization", `Bearer ${loginResponseUser2.token}`)
      .send(new_data)

    expect(response_401.status).toBe(401)
    expect(response_401.body.message).toEqual(
      "A user cannot interfere with another"
    )

    const response_200 = await request(app)
      .patch(`/api/users/${loginResponseUser1.id}/`)
      .set("Authorization", `Bearer ${loginResponseUser1.token}`)
      .send(new_data)

    expect(response_200.status).toBe(200)
    expect(response_200.body).toHaveProperty("id")
    expect(response_200.body).not.toHaveProperty("password")
    expect(response_200.body.full_name).toEqual(new_data.full_name)

    response_200.body.numbers.map((item: { number: string }) =>
      expect(new_data.numbers).toContain(item.number)
    )
    response_200.body.emails.map((item: { email: string }) =>
      expect(new_data.emails).toContain(item.email)
    )
  })

  test("DELETE /api/users/:id/ - it should be possible to delete a user", async () => {
    const response_404 = await request(app)
      .delete(`/api/users/9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d/`)
      .set("Authorization", `Bearer ${loginResponseUser1.token}`)

    expect(response_404.status).toBe(404)
    expect(response_404.body.message).toEqual("User not found")

    const response_400 = await request(app)
      .delete(`/api/users/${loginResponseUser1.id}/`)
      .set("Authorization", `Bearer teste`)

    expect(response_400.status).toBe(400)
    expect(response_400.body.message).toEqual("Invalid token")

    const response_401 = await request(app)
      .delete(`/api/users/${loginResponseUser1.id}/`)
      .set("Authorization", `Bearer ${loginResponseUser2.token}`)

    expect(response_401.status).toBe(401)
    expect(response_401.body.message).toEqual(
      "A user cannot interfere with another"
    )

    const response_204 = await request(app)
      .delete(`/api/users/${loginResponseUser1.id}/`)
      .set("Authorization", `Bearer ${loginResponseUser1.token}`)

    expect(response_204.status).toBe(204)
  })
})
