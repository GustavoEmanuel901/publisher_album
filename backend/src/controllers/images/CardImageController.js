const CardImage = require('../../models/CardImage')
const generateUniqueId = require('../../utils/generateUniqueId')
const jwt = require('jsonwebtoken')
const aws = require("aws-sdk")
const { promisify } = require('util')
const fs = require('fs')
const path = require('path')

const s3 = new aws.S3()

module.exports = {

    async index(req, res) {

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

                const cardImages = await CardImage.findAll()

                return res.json(cardImages)
            })

        } catch (err) {
            return res.status(401).json({error: 'Users not found'})
        }
    
        
    },

    async store(req, res) {

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

                let { originalname: name, size, key, location: url = '' } = req.file

                const id = generateUniqueId()

                if(!url) {
                    url = `${process.env.APP_URL}/files/${key}`
                }

                const cardImage = await CardImage.create({
                    id,
                    name,
                    size,
                    key,
                    url
                })

                return res.json(cardImage)
            })

        } catch (err) {
            return res.status(401).json({error: 'Users not found'})
        }

        
    }, 

    async delete(req,res) {

        const { id, key } = req.params

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

                if(process.env.STORAGE_TYPE === 's3') {
                    s3.deleteObject({
                        Bucket: process.env.AWS_BUCKET_NAME,
                        Key: key ,
                    }).promise()
                } else {
                    promisify(fs.unlink)(path.resolve(__dirname, '..' ,'..', '..', 'tmp', 'uploads', key))
                }

                await CardImage.destroy({
                    where: { id }
                })

                res.json({ ok: true })
            })

        } catch (err) {
            return res.status(401).json({error: 'Users not found'})
        }
    
    }
}