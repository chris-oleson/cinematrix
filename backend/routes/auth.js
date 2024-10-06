import { Router } from 'express'
const router = Router()
import bcrypt from 'bcryptjs'
import mysql from 'mysql2/promise'
import database from '../database.js'

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
    const db = await mysql.createConnection(database)
    const user = await checkName(req.body.name, db)
    if (!user) {
        res.status(404).send("Incorrect username or password")
    }
    else if (!await passwordIsValid(user.id, req.body.password, db)) {
        res.status(404).send("Incorrect username or password")
    }
    else {
        req.session.user = user.id
        res.sendStatus(200)
        db.end()
    }
})

router.post('/create', async (req, res) => {
    if (!req.body.name || !req.body.password) {
        res.status(400).send('All fields are required')
    }
    else {
        const db = await mysql.createConnection(database)
        const [existingUser] = await db.query('SELECT id FROM users WHERE name = ?', [req.body.name])
        if (existingUser.length) {
            res.status(400).send('This username is already registered')
        }
        else {
            const salt = bcrypt.genSaltSync(10)
            const encryptedPassword = bcrypt.hashSync(req.body.password, salt)
            await db.query("INSERT INTO users VALUES (NULL, ?, ?)", [req.body.name.toLowerCase(), encryptedPassword])
            res.sendStatus(200)
        }

        db.end()
    }
})

router.post('/logout', (req, res) => {
    req.session.destroy()
    res.sendStatus(200)
})

async function passwordIsValid(id, password, db) {
    const [users] = await db.query("SELECT * FROM users WHERE id = ?", [id])
    return (users.length && bcrypt.compareSync(password, users[0].password))
}

// Returns user object if name exists
async function checkName(name, db) {
    const [users] = await db.query('SELECT * FROM users WHERE name = ?', [name])
    if (users.length) {
        return users[0]
    }
    else {
        return null
    }
}

export default router
