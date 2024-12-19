import { Router } from 'express'
const router = Router()

// Get favorites
router.get('/', async (req, res) => {
    const favorites = await req.database.all('SELECT * FROM favorites WHERE user_id = ?', [req.session.user])
    res.send(favorites).status(200)
    req.database.close()
})

// Add to favorites
router.post('/', async (req, res) => {
    await req.database.run('INSERT INTO favorites VALUES ( ?, ?, ?, ?, ? )', [req.body.imdb_id, req.body.title, req.body.year, req.body.poster, req.session.user])
    res.sendStatus(200)
    req.database.close()
})

// Delete from favorites
router.delete('/:id', async (req, res) => {
    await req.database.get('DELETE FROM favorites WHERE imdb_id = ?', [req.params.id])
    res.sendStatus(200)
    req.database.close()
})

export default router
