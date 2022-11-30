import { DataSource } from "typeorm"
import AppDataSource from "../../data-source"
import request from "supertest"
import app from "../../app"
import { mockedUser1, mockedLoginUser1 } from "../mocks"

describe("Tests Login routes", () => {
  let connection: DataSource

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((resp) => {
        connection = resp
      })
      .catch((error) => {
        console.error("Error during Data Source initializatio", error)
      })

    await request(app).post("/api/users/").send(mockedUser1)
  })

  afterAll(async () => {
    await connection.destroy()
  })

  test("POST /api/login/ - user must be able to login", async () => {
    const response = await request(app)
      .post("/api/login/")
      .send(mockedLoginUser1)

    expect(response.body).toHaveProperty("token")
    expect(response.body).toHaveProperty("id")
    expect(response.status).toBe(200)
  })

  test("POST /api/login/ - must not log in if the email or password is wrong", async () => {
    const response = await request(app).post("/api/login/").send({
      full_name: "teste",
      password: "12345"
    })

    expect(response.body.message).toEqual("full_name or password are wrong")
    expect(response.status).toBe(401)
  })
})
