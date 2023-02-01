import { Router } from "express";
import usersController from "../controllers/users.controller";
import { AuthUser } from "../middlewares/auth";

const usersRouter = Router()

export default usersRouter
    .get('/users', AuthUser, usersController.GET)
    .post('/register', usersController.REGISTER)
    .post('/login', usersController.LOGIN)
    .put("/update", AuthUser, usersController.USERUPDATE)