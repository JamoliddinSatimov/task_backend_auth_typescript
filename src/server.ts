import {config} from "dotenv"
import express, { Application, Request, Response } from "express"
import cors from "cors"
import { dataSource } from "./config/ormconfig"
import { errorHandle } from "./middlewares/errorHandle"
import routes from "./routes"

const app: Application = express()
config()

dataSource.initialize()
.then(() => console.log("connected")).catch(err => console.log(err))


app.use(express.json())
app.use(cors())
app.use(routes)
app.use(errorHandle)

app.use("/*", (_: Request, res: Response) => res.sendStatus(404))

app.listen(9090, () => console.log(9090))