const jwt = require('jsonwebtoken')

function auth(req, res) {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return res.status(401).send({ error: 'No token provided' })
    }

    const parts = authHeader.split(' ')

    if (!parts.length === 2) {
        return res.status(401).send({ error: 'Token error' })
    }

    const [scheme, token] = parts

    if (scheme !== 'Bearer') {
        return res.status(401).send({ error: 'Token bad formatted' })
    }

    jwt.verify(token, process.env.APP_SECRET, (err, decoded) => {
        if (err) return res.status(401).send({ error: 'Token invalid' })

        req.userId = decoded.id

        return res.json({ ok: true, user: req.userId })
    })
}

module.exports = auth