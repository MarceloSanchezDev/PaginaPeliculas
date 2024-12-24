import { UserModel } from '../models/turso/users.js'
import { validRegisterUser, validUser } from '../schema/userSchema.js'
import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../utilsBackend/config.js'
import { info } from '../utilsBackend/logger.js'

export class UserController {
  static async registerUser (req, res, next) {
    try {
      // envio al esquema el body de la request
      info('(Controlador):',req.body)
      const result = validRegisterUser(req.body)
      info('(Controlador)resutado :', result.data)
      // si sale exitosa se envia al modelo
      const userValid = await UserModel.registerUser({ input: result.data })
      if(userValid instanceof Error){
        next(userValid)
        return
      }
      // si el modelo crea con exito el usuario , extraigo el username , nombre, apellido y el id
      const { username, id } = userValid[0]
      info('(Controlador)UserValid :', userValid)
      info('(Controlador)username:', username, 'id:', id)
      // los imprimo en el token
      const token = jwt.sign({ id, username }, SECRET_KEY, {
        expiresIn: 60 * 60
      })
      info('(Controlador)token :', token)
      info('(Controlador)nuevo usuario creado : ', userValid)
      // los envio al front
      res.send({ username, token })
    } catch (error) {
      // si hay algun error los mando al middleware
      next(error)
    }
  }

  static async login (req, res, next) {
    try {
      // envio al esquema el body de la request
      const result = validUser(req.body)
      info('(Controlador) resultado :', result)
      // si sale exitosa se envia al modelo
      const userValid = await UserModel.login({ input: result.data })
      info('(Controlador)UserValid :', userValid)
      // si el modelo crea con exito el usuario , extraigo el username y el id en Hexadecimal
      const { email, id } = userValid
      info('(Controlador)username:', email, 'id:', id)
      // los imprimo en el token
      const token = jwt.sign({ id, email }, SECRET_KEY, {
        expiresIn: '2 days'
      })
      info('(Controlador)usuario:', userValid, '(Controlador)token:', token)
      // los envio al front
      res.send({ email, token, id })
    } catch (error) {
      // si hay algun error los mando al middleware
      next(error)
    }
  }
}
