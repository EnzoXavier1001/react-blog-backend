const User = require("../models/User")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
require('dotenv').config();

class UserController {
    async index(req, res) {
        try {
            const users = await User.find()
            return res.status(200).json(users)
        } catch (error) {
            console.error(error)
        }
    }

    async auth(req, res) {
        try {
            const data = req.body;
            const userExists = await User.findOne({ email: data.email });

            if (!userExists) {
                return res.status(400).json({ message: 'E-mail não cadastrado no sistema.' });
            }

            console.log(userExists)

            const { _id, password } = userExists;

            const passwordIsMatch = await bcrypt.compare(data.password, password);

            if (passwordIsMatch) {
                const token = jwt.sign({userId: _id}, process.env.SECRET, { expiresIn: 300 })
                return res.status(200).json({auth: true, token, message: 'Autenticação bem-sucedida!' });
            } else {
                return res.status(400).json({ message: 'Senha incorreta.' });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro interno do servidor.' });
        }
    }

    async create(req, res) {
        try {
            const { name, email, password } = req.body 

            const emailExists = await User.findOne({email})

            if(emailExists) {
                return res.status(400).json({message: 'Email já cadastrado no sistema'})
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