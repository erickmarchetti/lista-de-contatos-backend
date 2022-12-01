import { NextFunction, Request, Response } from "express"
import { verify } from "jsonwebtoken"
import { AppError } from "../errors/appErrors"
import "dotenv/config"

const verifyTokenMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.headers.authorization

  if (!token) {
    throw new AppError(400, "Token required")
  }

  token = token?.includes("Bearer") ? token.split(" ")[1] : token

  verify(token, process.env.SECRET_KEY as string, (error, decoded) => {
    if (error) {
      throw new AppError(400, "Invalid Token")
    }

    typeof decoded !== "string" && (req.userId = decoded?.userId)
  })

  return next()
}

export default verifyTokenMiddleware
