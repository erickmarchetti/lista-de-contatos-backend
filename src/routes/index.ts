import { Express } from "express"
import loginRouter from "./login.routes"
import userRouter from "./user.routes"

export const appRoutes = (app: Express) => {
  app.use("/api/users/", userRouter)
  app.use("/api/login/", loginRouter)
}
