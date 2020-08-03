const CoverImage = require('../../models/CoverImage')
const generateUniqueId = require('../../utils/generateUniqueId')

module.exports = {

    async index(req, res) {
        const coverImages = await CoverImage.findAll()

        return res.json(coverImages)
    },

    async store(req, res) {

        let { originalname: name, size, key, location: url = '' } = req.file

        const id = generateUniqueId()

        if(!url) {
            url = `${process.env.APP_URL}/files/${key}`
        }

        const coverImage = await CoverImage.create({
            id,
            name,
            size,
            key,
            url
        })

        return res.json(coverImage)
    }
}