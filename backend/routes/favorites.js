import { Router } from 'express'
const router = Router()
import mysql from 'mysql2/promise'
import database from '../database.js'

// Get favorites
router.get('/', async (req, res) => {
    const db = await mysql.createConnection(database)
    const [favorites] = await db.query('SELECT * FROM favorites WHERE user_id = ?', [req.session.user])
    res.send(favorites).status(200)
    db.end()
})

// Add to favorites
router.post('/', async (req, res) => {
    const db = await mysql.createConnection(database)
    await db.query('INSERT INTO favorites VALUES ( ?, ?, ?, ?, ? )', [req.body.imdb_id, req.body.title, req.body.year, req.body.poster, req.session.user])
    res.sendStatus(200)
    db.end()
})

// Delete from favorites
router.delete('/:id', async (req, res) => {
    const db = await mysql.createConnection(database)
    await db.query('DELETE FROM favorites WHERE imdb_id = ?', [req.params.id])
    res.sendStatus(200)
    db.end()
})

export default router
