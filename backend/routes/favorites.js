import { Router } from 'express'
const router = Router()
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

async function createConnection() {
    return open({
        filename: './sqlite.db',
        driver: sqlite3.Database
    });
}

// Get favorites
router.get('/', async (req, res) => {
    const db = await createConnection()
    const favorites = await db.all('SELECT * FROM favorites WHERE user_id = ?', [req.session.user])
    res.send(favorites).status(200)
    await db.close()
})

// Add to favorites
router.post('/', async (req, res) => {
    const db = await createConnection()
    await db.run('INSERT INTO favorites VALUES ( ?, ?, ?, ?, ? )', [req.body.imdb_id, req.body.title, req.body.year, req.body.poster, req.session.user])
    res.sendStatus(200)
    await db.close()
})

// Delete from favorites
router.delete('/:id', async (req, res) => {
    const db = await createConnection()
    await db.get('DELETE FROM favorites WHERE imdb_id = ?', [req.params.id])
    res.sendStatus(200)
    await db.close()
})

export default router
