const Cards = require('../../models/Cards') 
const jwt = require('jsonwebtoken')
const generateUniqueId = require('../../utils/generateUniqueId')

module.exports = {
    async index(req, res) {

    },

    async store(req, res){

        const authHeader = req.headers.authorization

        try {
            if (!authHeader) {
                return res.status(401).send({ error: 'No token provided' })
            }

            const parts = authHeader.split(' ')

            if (!parts.length === 2) {
                return res.status(401).send({ error: 'Token error' })
            }

            const [scheme, tokenValidate] = parts

            if (scheme !== 'Bearer') {
                return res.status(401).send({ error: 'Token bad formatted' })
            }

            jwt.verify(tokenValidate, process.env.APP_SECRET, async (err, decoded) => {
                if (err) return res.status(401).send({ error: 'Token invalid' })
        
                req.userId = decoded.id

                const id = generateUniqueId()

                const { number, description } = req.body

                const image_id = req.headers.referer
                const image_url = req.headers.host

                const cards = await Cards.create({
                    id,
                    number,
                    description,
                    image_id,
                    image_url
                })

                return res.json(cards)
            })

        } catch (err) {
            return res.status(401).json({error: 'Users not found'})
        }
    }
}