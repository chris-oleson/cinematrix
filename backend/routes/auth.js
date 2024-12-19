import { Router } from 'express'
const router = Router()
import bcrypt from 'bcryptjs'

// All endpoints on this route are public. You have been warned.

router.post('/check-session', (req, res) => {
    if (req.session.user) {
        res.sendStatus(200)
    } else {
        req.session.destroy()
        res.sendStatus(401)
    }
})

router.post('/login', async (req, res) => {
    const user = await checkName(req.body.name, req.database)
    if (!user) {
        res.status(404).send("Incorrect username or password")
    }
    else if (!await passwordIsValid(user.id, req.body.password, req.database)) {
        res.status(404).send("Incorrect username or password")
    }
    else {
        req.session.user = user.id
        res.sendStatus(200)
    }
    req.database.close()
})

router.post('/create', async (req, res) => {
    if (!req.body.name || !req.body.password) {
        res.status(400).send('All fields are required')
    }
    else {
        const existingUser = await req.database.get('SELECT id FROM users WHERE name = ?', [req.body.name])
        if (existingUser) {
            res.status(400).send('This username is already registered')
        }
        else {
            const salt = bcrypt.genSaltSync(10)
            const encryptedPassword = bcrypt.hashSync(req.body.password, salt)
            await req.database.run("INSERT INTO users VALUES (NULL, ?, ?)", [req.body.name.toLowerCase(), encryptedPassword])
            res.sendStatus(200)
        }
        req.database.close()
    }
})

router.post('/logout', (req, res) => {
    req.session.destroy()
    res.sendStatus(200)
})

async function passwordIsValid(id, password, db) {
    const user = await db.get("SELECT * FROM users WHERE id = ?", [id])
    return (user && bcrypt.compareSync(password, user.password))
}

// Returns user object if name exists
async function checkName(name, db) {
    const user = await db.get('SELECT * FROM users WHERE name = ?', [name])
    if (user) {
        return user
    }
    else {
        return null
    }
}

export default router
