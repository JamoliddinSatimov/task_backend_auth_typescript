import bcrypt from "bcrypt"
import { sign } from "../utils/jwt"
import { NextFunction, Request, Response } from "express";
import { dataSource } from "../config/ormconfig";
import { Users } from "../entities/users.entity";
import { ErrorHandler } from "../errors/error";
import { usersLoginValidation, usersRegisterValidation, userUpdateValidation } from "../validation/users.validation";
import { RegisterUsers } from "../interfaces";


export default {
    GET: async(req: Request, res: Response, next: NextFunction) => {

        const { id } = req["userId"]
        
        const user = await dataSource
        .getRepository(Users)
        .createQueryBuilder("users")
        .where(`users.id = :id`, { id })
        .getOneOrFail().catch(err => next(new ErrorHandler(err.message, 503))
        )

        if(user) res.json({ success: true, user })
    },

    REGISTER: async(req: Request, res: Response, next: NextFunction) => {

        const { error, value } = usersRegisterValidation.validate(req.body)

        if (error) {
            return next(new ErrorHandler(error.message, 400))
        }

        const { first_name, last_name, username, password  } = value

        const newUser: any = await dataSource.createQueryBuilder()
        .insert()
        .into(Users)
        .values({
            first_name,
            last_name,
            username,
            password: bcrypt.hashSync(password, 10)
        }).returning(["id", "first_name", "last_name", "username", "password"])
        .execute()
        .catch(err => next(new ErrorHandler(err.message, 503)))

        if (newUser) {

            const data: RegisterUsers = newUser?.raw[0]

            const token = sign({id: data?.id})
        
        

            res.json({ success: true, data, access_token: token })
        }

    },

    USERUPDATE: async(req: Request, res: Response, next: NextFunction) => {

        const { id } = req["userId"]

        const oldData = await dataSource
        .getRepository(Users)
        .createQueryBuilder("users")
        .where(`users.id = :id`, { id })
        .getOneOrFail().catch(err => next(new ErrorHandler(err.message, 503))
        )

        const { first_name, last_name, username, password } = req.body

        const updateUser = await dataSource
        .createQueryBuilder()
        .update(Users)
        .set({  first_name: first_name? first_name : oldData["first_name"],
                last_name: last_name? last_name: oldData["last_name"],
                username: username? username: oldData["username"], 
                password: password? bcrypt.hashSync(password, 10): oldData["password"] })
                .returning(["id", "first_name", "last_name"])
        .where("id = :id", { id })
        .execute().catch(err => next(new ErrorHandler(err.message, 503)))

        if (updateUser) {
            res.json({
                success: true,
                message: "user has been updated successfully",
                updatedUser: updateUser.raw
            })
        }
        

    },

    
    LOGIN: async(req: Request, res: Response, next: NextFunction) => {

        const { error, value } = usersLoginValidation.validate(req.body)

        if (error) {
            return next(new ErrorHandler(error.message, 400))
        }

        const { username, password } = value

   
        
        const getUser = await dataSource
        .getRepository(Users)
        .createQueryBuilder("users")
        .where(`users.username = :username`, { username })
        .getOneOrFail().catch(err => next(new ErrorHandler(err.message, 503))
        )

        if (getUser) {
            const isValidPassword = bcrypt.compareSync(password, getUser["password"])

            const access_token = sign({id: getUser["id"]})


            if(isValidPassword){ res.json({
                success: true,
                user: getUser,
                access_token
            })}else{
                res.json({
                    message: 'username or password invalid',
                    status: 400
                })
            }

        } 

    }, 
}