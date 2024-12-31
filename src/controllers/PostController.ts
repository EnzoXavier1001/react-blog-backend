const Post = require("../models/Post")

class PostController {
    async index(req, res) {
        try {
            const posts = await Post.find()
            return res.status(200).json(posts)
        } catch (error) {
            console.error(error)
        }
    }

    async show(req, res) {
        const { id } = req.params
        try {
            const post = await Post.findById(id)

            if(!post) {
                return res.status(400).json({error: 'Post não encontrado'})
            }

            return res.status(200).json(post)
        } catch (error) {
            console.error(error)
        }
    }

    async create(req, res) {
        try {
            const { title, description, cover } = req.body 
            const post = await Post.create({ title, description, cover, createdAt: new Date()})
            return res.status(201).json(post)
        } catch (error) {
            console.error(error)
        }
    }

    async update(req, res) {
        const { id } = req.params
        try {
            const { title, description, cover } = req.body 

            const post = await Post.findOneAndUpdate({_id: id}, {
                title,
                description,
                cover
            })

            return res.status(201).json({message: 'Post atualizado com sucesso!'})
        } catch (error) {
            console.error(error)
        }
    }
    
    async delete(req, res) {
        const { id } = req.params
        try {
            const postExists = await Post.findById(id)

            if(!postExists) {
                return res.status(400).json({error: 'Post não encontrado'})
            } 
            
            await Post.deleteOne({_id: id}).then(() => {
                return res.status(201).json({message: 'Post excluido com sucesso!'})
            })

        } catch (error) {
            console.error(error)
        }
    }
}

module.exports = PostController