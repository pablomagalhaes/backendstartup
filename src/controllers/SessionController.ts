import { Request, Response } from 'express';
import knex from '../database/connection';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';


function generateToken(params: any) {
    
    return jwt.sign(params, String(process.env.SECRET_KEY), {
      expiresIn: '20m',
    })
  }

function decodeToken(params: string): { email: string; password: string } {
  return jwt.decode(params) as { email: string; password: string }
}


class SessionController {

    async loginUser(req: Request, res: Response) {

        try {
            const { email, password } = req.body

            const trx = await knex.transaction();

            if (!email || !password) return res.status(400) //400 Bad Request
            .json({ success: false, error: 'Informe o email e password' });
        
            const user = await trx('users').where({ email })

            if(!user[0]) {
                    return res.status(404).send('Usuário não cadastrado') //404 Not Found
                }
        
            if(!await bcrypt.compare(password, user[0].password)) {
                return res.status(401).send('Usuário ou senha incorretos') //401 Unauthorized
            }
        
            delete user[0].password
            const token = generateToken({ id: user[0].id })
            // const token = jwt.sign({ id: user[0].id }, 
            //   authConfig.jwt.key, 
            //   { expiresIn: authConfig.jwt.expiresIn })

            await trx.commit()
        
            return res.status(200).json({ user: user[0], token }) //200 OK
        }catch (err) {
            return res.status(400).json({
                message: err.message || 'Erro inesperado no Login.' //400 Bad Request
            })
        }

    }


}

export default SessionController;
