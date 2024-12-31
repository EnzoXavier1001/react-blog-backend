const User = require("../models/User")
const bcrypt = require('bcrypt');

class UserController {
    async index(req, res) {
        try {
            const users = await User.find()
            return res.status(200).json(users)
        } catch (error) {
            console.error(error)
        }
    }

    async create(req, res) {
        try {
            const { name, email, password } = req.body 

            const emailExists = await User.find({email})

            if(emailExists) {
                return res.status(400).json({error: 'Email já cadastrado no sistema'})
            }

            const hashedPassword = await bcrypt.hash(password, 10)

            await User.create({ name, email, password: hashedPassword })

            return res.status(201).json({message: 'Usuário criado com sucesso!'})
        } catch (error) {
            console.error(error)
        }
    }

    async show(req, res) {
        const { id } = req.params
        try {
            const user = await User.findById(id)

            if(!user) {
                return res.status(400).json({error: 'Usuário não encontrado'})
            }

            return res.status(200).json(user)
        } catch (error) {
            console.error(error)
        }
    }
}

module.exports = UserController