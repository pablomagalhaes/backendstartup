import { Request, Response } from 'express';
import knex from '../database/connection';
import bcrypt from 'bcryptjs';

class UsersController {
    async index(req: Request, res: Response) {
        const users = await knex('users').select('*');
        
        const serializedItems = users.map(user => {
            return {
                id: user.id,
                name: user.name,
                email: user.email,
            };
        });

    return res.json(serializedItems);
    }

    async create(req: Request, res: Response) {


        try {
           
            const { name, email,  password: uncryptedPass} = req.body

            const trx = await knex.transaction();

            if (!name || !email || !uncryptedPass) return res.status(400)
            .json({ success: false, error: 'Informe o nome, email and password' });
    
            const [emailExists] = await trx('users').where('email', '=', email);
  
            if (emailExists) return res.status(400)
            .json({ success: false, message: 'Email já cadastrado' });
        
            const salt =  await bcrypt.genSalt(10);
            const password = await bcrypt.hash(uncryptedPass, salt)

            await trx('users').insert({
                name, email,password
            })

            await trx.commit()

            return res.status(201).send('Usuário criado com sucesso!') //201 Created
        }
        catch (err) {
            return res.status(400).json({
                message: err.message || "Erro inesperado ao criar user" //400 Bad Request
            })
        }
     
    }
}

export default UsersController;
