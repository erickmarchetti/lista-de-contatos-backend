import { DataSource } from "typeorm"
import "dotenv/config"

const AppDataSource = new DataSource(
  process.env.NODE_ENV === "test"
    ? {
        type: "sqlite",
        database: ":memory:",
        entities: ["src/entities/**/*.ts"],
        synchronize: true
      }
    : {
        type: "postgres",
        host: "localhost",
        port: Number.isNaN(process.env.POSTGRES_PORT)
          ? 5432
          : Number(process.env.POSTGRES_PORT),
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PWD,
        database: process.env.POSTGRES_DB,
        synchronize: false,
        logging: true,
        entities: ["src/entities/*.ts"],
        migrations: ["src/migrations/*.ts"]
      }
)

export default AppDataSource
