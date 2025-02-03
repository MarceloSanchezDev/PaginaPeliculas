import bcrypt from 'bcrypt'
import crypto from 'node:crypto'
import { DBTOKEN } from '../../utilsBackend/config.js'
import { info, cError } from '../../utilsBackend/logger.js'
import { createClient } from '@libsql/client'

const db = createClient({
  url: 'libsql://usuariospeliculas-marcelosanchezdev.turso.io',
  authToken: DBTOKEN
})
/* CREATE TABLE IF NOT EXISTS  user_favoritos(id_movie varchar(36) primary key),*/
await db.execute('CREATE TABLE IF NOT EXISTS USER (id_user varchar(36) primary key, username TEXT, password varchar(255), email varchar(255) unique)');


export class UserModel {
  static async registerUser ({ input }) {
    // extraigo del input los siguientes datos
    const SALT_ROUNDS = 10
    const {
            username,
            password,
            email  } = input
    info('(Modelo)input:', input)
    // hasheo la contraseña
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
    info('(Modelo)contrseña hasheada :', hashedPassword)
    // creo un nuevo id
    const uuidResult = crypto.randomUUID()
    info('(Modelo)id:', uuidResult)
    try {
      // inserto en la base de datos el nuevo usuario
      await db.execute(
        'INSERT INTO user (id_user, username, password, email) values(?,?,?,?)', [uuidResult, username, hashedPassword, email])
    } catch (e) {
      // si hay algun error lo envio al controlador 
      cError('(Modelo)Error registrar al Usuario', e.name , e.message )
      return e
    }
    // devuelvo el usuario al controlador si fue un exito
    const { rows } = await db.execute(
      'SELECT *, id_user as id FROM user WHERE id_user = ?', [uuidResult]
    )
    info('(Modelo)user', rows)
    return rows
  }

  static async login ({ input }) {
    // extraigo del input los siguientes datos
    const {
      email,
      password
    } = input
    info('(Modelo)info del usuario:', input)
    try {
      // busco al usuario en a base de datos
      const { rows } = await db.execute('SELECT *, id_user as id FROM user WHERE email = ?', [email])
      info('(Modelo) user', rows)
      if (rows.length === 0) { throw new Error('User not found') }
      const validatedUser = rows[0]
      info('(Modelo)usuario:', validatedUser)
      // comparo  la contraseña con la hasheada
      const passwordMach = await bcrypt.compare(password, validatedUser.password)
      if (!(rows && passwordMach)) { throw new Error('credentials invalid') }
      // retorno el usuario
      return validatedUser
    } catch (e) {
      // si hay algun error lo envio al controlador
      cError('(Modelo)error al iniciar sesion', e)
      return e
    }
  }
}
