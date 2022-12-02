import { Express } from "express"
import contactRouter from "./contact.routes"
import loginRouter from "./login.routes"
import userRouter from "./user.routes"

export const appRoutes = (app: Express) => {
  app.use("/api/users", userRouter)
  app.use("/api/login", loginRouter)
  app.use("/api/contacts", contactRouter)
}
